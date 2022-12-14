import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityId';
import { Result } from '../../../src/core/logic/Result';
import { StoreAddress } from '../../../src/packages/pie-store/domain/StoreAddress';
import { PieStoreCreatedEvent } from '../../../src/packages/pie-store/domain/events/PieStoreCreatedEvent';
import { PieStore } from '../../../src/packages/pie-store/domain/PieStore';
import { PieStoreId } from '../../../src/packages/pie-store/domain/PieStoreId';
import { StoreName } from '../../../src/packages/pie-store/domain/StoreName';

jest
  .useFakeTimers()
  .setSystemTime(new Date('1986-07-17'));

const generatePieStoreProps = () => {
  return {
    address: StoreAddress.create({
      address: ['A Street Name'],
      city: 'aCity',
      county: 'aCounty',
      country: 'aCountry',
      postalCode: 'AB1 2CD',
    }).getValue(),
    storeName: StoreName.create('The Pie Shop').getValue(),
    pieStoreSlug: 'a-pie-store-slug',
  };
};

describe('PieStore entity test', () => {
  describe('Entity initialisation', () => {
    let pieStore: Result<PieStore>;
    beforeEach(() => {
      pieStore = PieStore.create(generatePieStoreProps());
    });
    it('returns a successful Result entity', () => {
      expect(pieStore).toBeInstanceOf(Result);
    });
    it('returns a Result value of a PieStore entity', () => {
      expect(pieStore.getValue()).toBeInstanceOf(PieStore);
    });
    it('sets the PieStore Id to a UniqueEntityID value', () => {
      expect(pieStore.getValue().id).toBeInstanceOf(UniqueEntityID);
    });
    it('sets the name on the PieStore', () => {
      expect(pieStore.getValue().storeName.value).toBe('The Pie Shop');
    });
    it('sets the dateAdded on the PieStore', () => {
      expect(pieStore.getValue().dateAdded).toBe('1986-07-17T00:00:00.000Z');
    });
    it('creates a pieStoreCreated Event on the PieStore Aggregate', () => {
      expect(pieStore.getValue().domainEvents[0]).toBeInstanceOf(PieStoreCreatedEvent);
    });
    it('reconstitues a pieStore', () => {
      const pieStoreProps = generatePieStoreProps();
      const pieStoreId = PieStoreId.create();

      const pieStoreReconsituted = PieStore.create(pieStoreProps, pieStoreId.id);

      expect(pieStoreReconsituted.getValue()).toBeInstanceOf(PieStore);
      expect(pieStoreReconsituted.getValue().id).toStrictEqual(pieStoreId.id);
    });
  });
});