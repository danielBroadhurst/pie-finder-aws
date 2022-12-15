import { UniqueEntityID } from '../../../core/domain/UniqueEntityId';
import { UseCase } from '../../../core/domain/UseCase';
import { Result } from '../../../core/logic/Result';
import { PieStoreRating, Review } from '../domain/Review';
import { UserId } from '../domain/UserId';
import { IReviewRepository } from '../repository/ReviewRepository';

interface AddPieStoreReviewUseCaseRequestDTO {
  pieStoreSlug: string;
  userId: string;
  title: string;
  userReview: string;
  bestPart?: string;
  pieStoreRating?: PieStoreRating;
}

export class AddPieStoreReviewUseCase
implements UseCase<AddPieStoreReviewUseCaseRequestDTO, Result<Review>> {
  reviewRepository: IReviewRepository;

  constructor(reviewRepository: IReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  public async execute(
    request: AddPieStoreReviewUseCaseRequestDTO,
  ): Promise<Result<Review>> {
    try {
      const reviewOrError = Review.create({
        title: request.title,
        pieStoreSlug: request.pieStoreSlug,
        userId: UserId.create(new UniqueEntityID(request.userId)),
        userReview: request.userReview,
      });
      if (reviewOrError.isFailure) {
        return Result.fail<Review>(reviewOrError.error);
      }
      const review = reviewOrError.getValue();
      await this.reviewRepository.save(review);
      return Result.ok<Review>(review);
    } catch (error) {
      return Result.fail<Review>(error);
    }
  }
}
