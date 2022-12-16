import { Entity } from '../../../core/domain/Entity';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityId';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';
import { Rating } from './PieStore';
import { UserId } from './UserId';

export type PieStoreRating = {
  overallRating?: Rating;
  pieSelectionRating: Rating;
  dietryRequirements: Rating;
  valueForMoney: Rating;
  customerServiceRating: Rating;
  pieKnowledgeRating: Rating;
  onsiteFacilities: Rating;
}

interface ReviewProps {
  title: string;
  userId: UserId;
  pieStoreSlug: string;
  userReview: string;
  bestPart?: string;
  pieStoreRating?: PieStoreRating;
}

export class Review extends Entity<ReviewProps> {

  public get id() {
    return this._id;
  }

  public get userId() {
    return this.props.userId;
  }

  public get pieStoreSlug() {
    return this.props.pieStoreSlug;
  }

  public get title() {
    return this.props.title;
  }

  public get userReview() {
    return this.props.userReview;
  }

  public get bestPart() {
    return this.props.bestPart;
  }

  public get pieStoreRating() {
    return this.props.pieStoreRating;
  }

  public static create(props: ReviewProps, id?: UniqueEntityID) {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: 'title' },
      { argument: props.userId, argumentName: 'userId' },
      { argument: props.pieStoreSlug, argumentName: 'pieStoreSlug' },
      { argument: props.userReview, argumentName: 'userReview' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Review>(guardResult.message);
    } else {
      return Result.ok<Review>(new Review({
        ...props,
      }, id));
    }
  }

  private constructor(props: ReviewProps, id?: UniqueEntityID) {
    super(props, id);
  }
}