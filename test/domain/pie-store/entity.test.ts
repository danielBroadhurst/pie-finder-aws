import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityId';
import { Result } from '../../../src/core/logic/Result';
import { PieStoreCreatedEvent } from '../../../src/packages/pie-store/domain/events/pieStoreCreatedEvent';
import { PieStore } from '../../../src/packages/pie-store/domain/pieStore';
import { PieStoreId } from '../../../src/packages/pie-store/domain/pieStoreId';

const generatePieStoreProps = () => {
  return {
    name: 'The Pie Shop',
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
      expect(pieStore.getValue().name).toBe('The Pie Shop');
    });
    it('sets the dateAdded on the PieStore', () => {
      expect(pieStore.getValue().dateAdded).toBeInstanceOf(Date);
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