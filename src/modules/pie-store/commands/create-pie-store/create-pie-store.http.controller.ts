/*
This code uses callbacks to handle asynchronous function responses.
It currently demonstrates using an async-await pattern.
AWS supports both the async-await and promises patterns.
For more information, see the following:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/calling-services-asynchronously.html
https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
*/

import { match, Result } from 'oxide.ts';
import { IdResponse } from '../../../../libs/api/id.response.dto';
import { AggregateID } from '../../../../libs/domain';
import { ConflictException } from '../../../../libs/exceptions';
import { PieStoreAlreadyExistsError } from '../../domain/pie-store.errors';
import { CreatePieStoreCommand } from './create-pie-store.command';
import { CreatePieStoreRequestDto } from './create-pie-store.dto';
import { CommandHandler } from './create-pie-store.service';

process.env.APP_ENV = 'development';

export class CreatePieStoreHttpController {
  private readonly commandService: CommandHandler;

  constructor(commandService: CommandHandler) {
    this.commandService = commandService;
  }

  async create(event: {
    body: CreatePieStoreRequestDto;
    httpMethod: any;
    path: string;
  }) {
    try {
      const command = new CreatePieStoreCommand(event.body);

      const result: Result<AggregateID, PieStoreAlreadyExistsError> =
        await this.commandService.execute(command);

      // Deciding what to do with a Result (similar to Rust matching)
      // if Ok we return a response with an id
      // if Error decide what to do with it depending on its type
      return match(result, {
        Ok: (id: string) => new IdResponse(id),
        Err: (error: Error) => {
          if (error instanceof PieStoreAlreadyExistsError) {
            throw new ConflictException(error.message);
          }
          throw error;
        },
      });
    } catch (error: any) {
      const responses = error.stack || JSON.stringify(error, null, 2);
      return {
        statusCode: 400,
        headers: {},
        body: JSON.stringify(responses),
      };
    }
  };
}