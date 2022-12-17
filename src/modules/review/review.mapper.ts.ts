import { UniqueEntityID } from '../../../libs/domain/UniqueEntityId';
import { Review } from './domain/review.entity';
import { UserId } from '../pie-store/domain/UserId';

export class ReviewMap {
  public static toPersistence(review: Review): any {
    return {
      id: review.id.toValue(),
      title: review.title,
      userId: review.userId.id.toValue(),
      pieStoreSlug: review.pieStoreSlug,
      userReview: review.userReview,
      bestPart: review.bestPart,
      pieStoreRating: review.pieStoreRating,
    };
  }

  public static toDomain(raw: any): Review {
    const reviewOrError = Review.create({
      ...raw,
      userId: UserId.create(raw.userId),
    }, new UniqueEntityID(raw.id));

    if (reviewOrError.isFailure) {
      throw new Error(reviewOrError.errorValue());
    }

    return reviewOrError.getValue();
  }
}