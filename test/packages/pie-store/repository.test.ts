import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityId';
import { DataStore } from '../../../src/core/infrastructure/DataStore';
import {
  IPieStore,
  PieStore,
} from '../../../src/packages/pie-store/domain/PieStore';
import { PieStoreId } from '../../../src/packages/pie-store/domain/PieStoreId';
import { PieStoreRepository } from '../../../src/packages/pie-store/repository/PieStoreRepository';

const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDestroy = jest.fn();

const mockDataStore: DataStore = {
  findById(query) {
    if (query.where.id.toString() === 'aKnownId') {
      return Promise.resolve({
        id: query.where.id,
        name: 'A Pie Store',
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
    it('has the required getPieStoreById method', () => {
      expect(pieStoreRepository).toHaveProperty('getPieStoreById');
    });
  });

  describe('getPieStoreById tests', () => {
    it('returns a PieStore record', async () => {
      const pieStoreId = PieStoreId.create(new UniqueEntityID('aKnownId'));
      const result = await pieStoreRepository.getPieStoreById(pieStoreId);
      expect(result).toBeInstanceOf(PieStore);
    });
    it('throws and error if the PieStoreId is unknown', async () => {
      const expectedError =
        'PieStoreId: [anUnknownId] does not exist in the system.';
      const pieStoreId = PieStoreId.create(new UniqueEntityID('anUnknownId'));
      await expect(
        pieStoreRepository.getPieStoreById(pieStoreId),
      ).rejects.toThrow(expectedError);
    });
  });

  describe('exists tests', () => {
    it('returns true if the PieStore record exists', async () => {
      const pieStoreId = PieStoreId.create(new UniqueEntityID('aKnownId'));
      const result = await pieStoreRepository.exists(pieStoreId);
      expect(result).toBeTruthy();
    });
    it('returns false if the PieStore record does not exist', async () => {
      const pieStoreId = PieStoreId.create(new UniqueEntityID('anUnknownId'));
      const result = await pieStoreRepository.exists(pieStoreId);
      expect(result).toBeFalsy();
    });
  });

  describe('save tests', () => {
    let result: PieStore;
    const pieStoreProps: IPieStore = {
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
      const pieStoreId = PieStoreId.create(new UniqueEntityID('aKnownId'));
      const pieStoreUpdate = PieStore.create(pieStoreProps, pieStoreId.id);
      await pieStoreRepository.save(pieStoreUpdate.getValue());
      expect(mockUpdate).toHaveBeenCalled();
    });
    it('calls the destroy dataStore method if an error occurs from create', async () => {
      mockCreate.mockImplementationOnce(() => Promise.reject());
      await pieStoreRepository.save(pieStore.getValue());
      expect(mockDestroy).toHaveBeenCalled();
    });
    it('calls the destroy dataStore method if an error occurs from update', async () => {
      const pieStoreId = PieStoreId.create(new UniqueEntityID('aKnownId'));
      const pieStoreUpdate = PieStore.create(pieStoreProps, pieStoreId.id);
      mockUpdate.mockImplementationOnce(() => Promise.reject());
      await pieStoreRepository.save(pieStoreUpdate.getValue());
      expect(mockDestroy).toHaveBeenCalled();
    });
  });
});
