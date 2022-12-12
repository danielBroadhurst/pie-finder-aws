import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityId';
import { DataStore } from '../../../src/core/infrastructure/DataStore';
import {
  IPieStore,
  PieStore,
} from '../../../src/packages/pie-store/domain/PieStore';
import { PieStoreRepository } from '../../../src/packages/pie-store/repository/PieStoreRepository';

const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDestroy = jest.fn();

const mockDataStore: DataStore = {
  findById(rawData) {
    console.log(rawData);
    throw new Error('Not used for PieStore');
  },
  findByName(pieStore: PieStore) {
    if (pieStore.id.equals(new UniqueEntityID('aKnownId')) || pieStore.pieStoreSlug === 'slug-search') {
      return Promise.resolve({
        id: 'anId',
        name: 'A Pie Store',
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
      const pieStore = PieStore.create({
        pieStoreSlug: 'a-pie-store-slug',
        name: 'Updated Name',
      }, new UniqueEntityID('aKnownId')).getValue();
      const result = await pieStoreRepository.exists(pieStore);
      expect(result).toBeTruthy();
    });
    it('returns false if the PieStore record does not exist', async () => {
      const pieStore = PieStore.create({ pieStoreSlug: 'aUnknownSlug' }).getValue();
      const result = await pieStoreRepository.exists(pieStore);
      expect(result).toBeFalsy();
    });
  });

  describe('save tests', () => {
    let result: PieStore;
    const pieStoreProps: IPieStore = {
      pieStoreSlug: 'a-pie-store-slug',
      name: 'The Pie Store',
    };
    const pieStore = PieStore.create(pieStoreProps);
    beforeEach(async () => {
      result = await pieStoreRepository.save(pieStore.getValue());
    });
    it('returns a PieStore record', async () => {
      expect(result).toBeInstanceOf(PieStore);
    });
    it('calls the create method on the dataStore', () => {
      expect(mockCreate).toHaveBeenCalled();
    });
    it('calls the update dataStore method if the PieStore exists', async () => {
      const pieStoreUpdate = PieStore.create({
        pieStoreSlug: result.pieStoreSlug,
        name: 'Updated Name',
      }, new UniqueEntityID('aKnownId'));
      await pieStoreRepository.save(pieStoreUpdate.getValue());
      expect(mockUpdate).toHaveBeenCalled();
    });
    it('calls the destroy dataStore method if an error occurs from create', async () => {
      mockCreate.mockImplementationOnce(() => Promise.reject());
      await pieStoreRepository.save(pieStore.getValue());
      expect(mockDestroy).toHaveBeenCalled();
    });
    it('calls the destroy dataStore method if an error occurs from update', async () => {
      const pieStoreUpdate = PieStore.create({
        pieStoreSlug: result.pieStoreSlug,
        name: 'Updated Name',
      }, new UniqueEntityID('aKnownId'));
      mockUpdate.mockImplementationOnce(() => Promise.reject());
      await pieStoreRepository.save(pieStoreUpdate.getValue());
      expect(mockDestroy).toHaveBeenCalled();
    });
  });
});
