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

import { Result } from 'oxide.ts';
import { ResponseBase } from '../../../../libs/api/response.base';
import { Paginated } from '../../../../libs/domain';
import { PieStoreModel } from '../../database/pie-store.repository';
import { PieStorePaginatedResponseDto } from '../../dtos/pie-store.paginated.response.dto';
import { FindPieStoresQuery } from './find-pie-stores.query';
import { FindPieStoresRequestDto } from './find-pie-stores.request.dto';
import { QueryHandler } from './find-pie-stores.service';

process.env.APP_ENV = 'development';

export class FindPieStoresHttpController {
  private readonly queryService: QueryHandler;

  constructor(queryService: QueryHandler) {
    this.queryService = queryService;
  }

  async findPieStores(event: {
    body: FindPieStoresRequestDto;
    httpMethod: any;
    path: string;
  }) {
    try {
      const query = new FindPieStoresQuery(event.body);

      const result: Result<Paginated<PieStoreModel>, Error> =
        await this.queryService.execute(query);

      const paginated = result.unwrap();

      return new PieStorePaginatedResponseDto({
        ...paginated,
        data: paginated.data.map((pieStore) => ({
          ...new ResponseBase(pieStore),
          pieStoreSlug: pieStore.pieStoreSlug,
          storeName: pieStore.storeName,
          storeAddress: pieStore.storeAddress,
        })),
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