import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID, CommandProps } from '../../../../libs/domain';
import { ConflictException } from '../../../../libs/exceptions';
import { PieStoreRepositoryPort } from '../../database/pie-store.repository.port';
import { PieStoreEntity } from '../../domain/pie-store.entity';
import { PieStoreAlreadyExistsError } from '../../domain/pie-store.errors';
import { Address } from '../../domain/value-objects/address.value-object';
import { CreatePieStoreCommand } from './create-pie-store.command';

interface CommandHandler {
  execute(
    command: CommandProps<CreatePieStoreCommand>
  ): Promise<Result<AggregateID, PieStoreAlreadyExistsError>>;
}

export class CreatePieStoreService implements CommandHandler {
  constructor(protected readonly pieStoreRepository: PieStoreRepositoryPort) {}

  async execute(
    command: CreatePieStoreCommand,
  ): Promise<Result<AggregateID, PieStoreAlreadyExistsError>> {
    const pieStore = PieStoreEntity.create({
      pieStoreSlug: command.pieStoreSlug,
      storeName: command.storeName,
      storeAddress: new Address({
        country: command.country,
        postalCode: command.postalCode,
        street: command.street,
      }),
    });

    try {
      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.pieStoreRepository.transaction(async () =>
        this.pieStoreRepository.insert(pieStore),
      );
      return Ok(pieStore.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new PieStoreAlreadyExistsError(error));
      }
      throw error;
    }
  }
}
