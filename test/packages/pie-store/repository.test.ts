import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityId';
import { DataStore } from '../../../src/core/infrastructure/DataStore';
import { Result } from '../../../src/core/logic/Result';
import {
  IPieStore,
  PieStore,
} from '../../../src/packages/pie-store/domain/PieStore';
import { StoreAddress } from '../../../src/packages/pie-store/domain/StoreAddress';
import { StoreName } from '../../../src/packages/pie-store/domain/StoreName';
import { PieStoreRepository } from '../../../src/packages/pie-store/repository/PieStoreRepository';

const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDestroy = jest.fn();

const mockDataStore: DataStore = {
  find() {
    return Promise.resolve([{
      id: 'anId',
      storeName: StoreName.create('A Pie Store').getValue(),
      pieStoreSlug: 'pieStore.pieStoreSlug',
    }]);
  },
  findById(rawData) {
    throw new Error(`Not used for PieStore, ${JSON.stringify(rawData)}`);
  },
  findByName(pieStore: PieStore) {
    if (
      pieStore.id.equals(new UniqueEntityID('aKnownId')) ||
      pieStore.pieStoreSlug === 'slug-search'
    ) {
      return Promise.resolve({
        id: 'anId',
        storeName: StoreName.create('A Pie Store').getValue(),
        pieStoreSlug: pieStore.pieStoreSlug,
      });
    }
    return Promise.resolve(false);
  },
  update: mockUpdate.mockImplementation((rawData) => {
    if (rawData.id.toString() !== 'aKnownId') {
      return Promise.reject();
    }
    return Promise.resolve();
  }),
  create: mockCreate.mockImplementation((rawData) => {
    if (rawData.id.toString() === 'aKnownId') {
      return Promise.reject();
    }
    return Promise.resolve();
  }),
  destroy: mockDestroy.mockImplementation(() => {
    return Promise.resolve();
  }),
};

describe('PieStore Repository Tests', () => {
  let pieStoreRepository: PieStoreRepository;
  beforeEach(() => {
    pieStoreRepository = new PieStoreRepository(mockDataStore);
  });
  describe('Respository Initilisation', () => {
    it('creates a PieStoreRepository', () => {
      expect(pieStoreRepository).toBeInstanceOf(PieStoreRepository);
    });
    it('has the required exists method', () => {
      expect(pieStoreRepository).toHaveProperty('exists');
    });
    it('has the required save method', () => {
      expect(pieStoreRepository).toHaveProperty('save');
    });
    it('has the required getPieStoreBySlug method', () => {
      expect(pieStoreRepository).toHaveProperty('getPieStoreBySlug');
    });
  });

  describe('getPieStoreBySlug tests', () => {
    it('returns a PieStore record', async () => {
      const pieStoreSlug = 'slug-search';
      const result = await pieStoreRepository.getPieStoreBySlug(pieStoreSlug);
      expect(result).toBeInstanceOf(PieStore);
    });
    it('throws and error if the PieStoreId is unknown', async () => {
      const expectedError =
        'PieStoreSlug: [anUnknownId] does not exist in the system.';
      await expect(
        pieStoreRepository.getPieStoreBySlug('anUnknownId'),
      ).rejects.toThrow(expectedError);
    });
  });

  describe('exists tests', () => {
    it('returns true if the PieStore record exists', async () => {
      const pieStoreProps: IPieStore = generatePieStoreProps(
        'a-pie-store-slug',
        'Updated Name',
      );
      const pieStore = PieStore.create(
        pieStoreProps,
        new UniqueEntityID('aKnownId'),
      ).getValue();
      const result = await pieStoreRepository.exists(pieStore);
      expect(result).toBeTruthy();
    });
    it('returns false if the PieStore record does not exist', async () => {
      const pieStoreProps: IPieStore = generatePieStoreProps(
        'aUnknownSlug',
        'Updated Name',
      );
      const pieStore = PieStore.create(pieStoreProps).getValue();
      const result = await pieStoreRepository.exists(pieStore);
      expect(result).toBeFalsy();
    });
  });

  describe('save tests', () => {
    let result: PieStore;
    let pieStore: Result<PieStore>;
    beforeEach(async () => {
      const pieStoreProps: IPieStore = generatePieStoreProps(
        'a-pie-store-slug',
        'The Pie Store',
      );
      pieStore = PieStore.create(pieStoreProps);
      result = await pieStoreRepository.save(pieStore.getValue());
    });
    it('returns a PieStore record', async () => {
      expect(result).toBeInstanceOf(PieStore);
    });
    it('calls the create method on the dataStore', () => {
      expect(mockCreate).toHaveBeenCalled();
    });
    it('calls the update dataStore method if the PieStore exists', async () => {
      const pieStoreProps: IPieStore = generatePieStoreProps(
        result.pieStoreSlug,
        'Updated Name',
      );
      const pieStoreUpdate = PieStore.create(
        pieStoreProps,
        new UniqueEntityID('aKnownId'),
      );
      await pieStoreRepository.save(pieStoreUpdate.getValue());
      expect(mockUpdate).toHaveBeenCalled();
    });
    it('calls the destroy dataStore method if an error occurs from create', async () => {
      mockCreate.mockImplementationOnce(() => Promise.reject());
      await pieStoreRepository.save(pieStore.getValue());
      expect(mockDestroy).toHaveBeenCalled();
    });
    it('calls the destroy dataStore method if an error occurs from update', async () => {
      const pieStoreProps: IPieStore = generatePieStoreProps(
        result.pieStoreSlug,
        'Updated Name',
      );
      const pieStoreUpdate = PieStore.create(
        pieStoreProps,
        new UniqueEntityID('aKnownId'),
      );
      mockUpdate.mockImplementationOnce(() => Promise.reject());
      await pieStoreRepository.save(pieStoreUpdate.getValue());
      expect(mockDestroy).toHaveBeenCalled();
    });
  });
});

function generatePieStoreProps(slug: string, storeName: string): IPieStore {
  return {
    pieStoreSlug: slug,
    storeName: StoreName.create(storeName).getValue(),
    address: StoreAddress.create({
      address: ['A Street Name'],
      country: 'aCountry',
      postalCode: 'AB1 2CD',
    }).getValue(),
  };
}
