import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '../../../../libs/domain';
import { ConflictException } from '../../../../libs/exceptions';
import { PieStoreRepositoryPort } from '../../database/pie-store.repository.port';
import { PieStoreEntity } from '../../domain/pie-store.entity';
import { PieStoreAlreadyExistsError } from '../../domain/pie-store.errors';
import { Address } from '../../domain/value-objects/address.value-object';
import { ICommandHandler } from '../../infrastructure/command-bus/command-bus';
import { CreatePieStoreCommand } from './create-pie-store.command';

export class CreatePieStoreHandler
implements
    ICommandHandler<
    CreatePieStoreCommand,
    Result<AggregateID, PieStoreAlreadyExistsError>
    > {
  commandToHandle: string = CreatePieStoreCommand.name;

  constructor(protected readonly pieStoreRepository: PieStoreRepositoryPort) {}

  async execute(command: CreatePieStoreCommand) {
    console.log(command);
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
