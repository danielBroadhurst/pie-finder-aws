import { PieStore } from '../../../src/packages/pie-store/domain/pieStore';

const generatePieStoreProps = () => {
  return {
    name: 'The Pie Shop',
  };
};

describe('PieStore entity test', () => {
  describe('Entity initialisation', () => {
    it('returns a PieStore entity', () => {
      const pieStore = PieStore.create(generatePieStoreProps());
      expect(pieStore).toBeInstanceOf(PieStore);
    });
    it('sets the PieStore name', () => {
      const pieStore = PieStore.create(generatePieStoreProps());
      expect(pieStore.name).toBe('The Pie Shop');
    });
  });
});