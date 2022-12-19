import { CreatePieStoreHandler } from './commands/create-pie-store/create-pie-store.service';
import { PieStoreRepository } from './database/pie-store.repository';
import { PieStoreRepositoryPort } from './database/pie-store.repository.port';
import { CommandBus, ICommand } from './infrastructure/command-bus/command-bus';

let commandPieStoreBus: CommandBus<ICommand, unknown>;
let pieStoreRepository: PieStoreRepositoryPort;

export const getPieStoreCommandBus = <T>():CommandBus<ICommand, T> => {
  if (commandPieStoreBus) {
    return commandPieStoreBus as CommandBus<ICommand, T>;
  }
  commandPieStoreBus = new CommandBus();
  commandPieStoreBus.registerHandler(new CreatePieStoreHandler(getPieStoreRepository()));
  return commandPieStoreBus as CommandBus<ICommand, T>;
};

export const getPieStoreRepository = (): PieStoreRepositoryPort => {
  if (pieStoreRepository) {
    return pieStoreRepository;
  }
  return new PieStoreRepository();
};
