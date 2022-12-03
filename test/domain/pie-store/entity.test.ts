import { Result } from '../../../src/core/logic/Result';
import { PieStore } from '../../../src/packages/pie-store/domain/pieStore';

const generatePieStoreProps = () => {
  return {
    name: 'The Pie Shop',
  };
};

describe('PieStore entity test', () => {
  describe('Entity initialisation', () => {
    it('returns a successful Result entity', () => {
      const pieStore = PieStore.create(generatePieStoreProps());
      expect(pieStore).toBeInstanceOf(Result);
    });
    it('returns a Result value of a PieStore entity', () => {
      const pieStore = PieStore.create(generatePieStoreProps());
      expect(pieStore.getValue()).toBeInstanceOf(PieStore);
    });
    it('sets the PieStore name on the Result value', () => {
      const pieStore = PieStore.create(generatePieStoreProps());
      console.log(pieStore);
      expect(pieStore.getValue().name).toBe('The Pie Shop');
    });
  });
});