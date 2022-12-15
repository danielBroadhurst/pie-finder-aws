import { DataStore } from '../../../core/infrastructure/DataStore';
import { Repository } from '../../../core/infrastructure/Repository';
import { Review } from '../domain/Review';
import { ReviewMap } from '../mappers/ReviewMap';

export interface IReviewRepository extends Repository<Review> {
  getPieStoreReviews(piestoreId: string): Promise<Review[]>;
}

export class ReviewRepository implements IReviewRepository {
  private dataStore: DataStore;

  constructor(dataStore: DataStore) {
    this.dataStore = dataStore;
  }

  public async getPieStoreReviews(piestoreId: string): Promise<Review[]> {
    return Promise.resolve([piestoreId as unknown as Review]);
  }

  public async exists(review: Review): Promise<boolean> {
    const reviewRecord = await this.dataStore.findById(review);
    return !!reviewRecord === true;
  }

  public async save(review:Review): Promise<Review> {
    const exists = await this.exists(review);

    const rawReview = ReviewMap.toPersistence(review);

    try {
      if (!exists) {
        await this.dataStore.create(rawReview);
      } else {
        await this.dataStore.update(rawReview);
      }
    } catch (error) {
      console.error(error);
      await this.rollbackSave(review);
    }
    return review;
  }

  private async rollbackSave(review: Review) {
    await this.dataStore.destroy({
      where: {
        id: review,
      },
    });
  }
}