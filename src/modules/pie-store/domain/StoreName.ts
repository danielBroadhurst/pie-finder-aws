import { ValueObject } from '../../../core/domain/ValueObject';
import { Result } from '../../../core/logic/Result';

interface StoreNameProps {
  value: string;
}

export class StoreName extends ValueObject<StoreNameProps> {
  public static create (storeName: string): Result<StoreName> {
    if (!!storeName === false || storeName.length === 0) {
      return Result.fail<StoreName>('Must provide an artist name');
    } else {
      return Result.ok<StoreName>(new StoreName({ value: storeName }));
    }
  }

  get value(): string {
    return this.props.value;
  }

  private constructor(props: StoreNameProps) {
    super(props);
  }
}