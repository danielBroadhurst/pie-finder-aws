import { ValueObject } from '../../../core/domain/ValueObject';
import { Result } from '../../../core/logic/Result';

type Address = {
  address: [string, string?, string?, string?];
  city?: string;
  county?: string;
  country: string;
  postalCode: string;
}

interface StoreAddressProps {
  value: Address;
}

export class StoreAddress extends ValueObject<StoreAddressProps> {
  public static create (storeAddress: Address): Result<StoreAddress> {
    if (Object.keys(storeAddress).length === 0) {
      return Result.fail<StoreAddress>('Must provide an address');
    } else {
      return Result.ok<StoreAddress>(new StoreAddress({ value: storeAddress }));
    }
  }

  get value(): Address {
    return this.props.value;
  }

  private constructor(props: StoreAddressProps) {
    super(props);
  }
}