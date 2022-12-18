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

import { PieStoreRepository } from '../modules/pie-store/database/pie-store.repository';
import { FindPieStoreHttpController } from '../modules/pie-store/queries/find-pie-stores/find-pie-stores.http.controller';
import { FindPieStoreRequestDto } from '../modules/pie-store/queries/find-pie-stores/find-pie-stores.request.dto';
import { FindPieStoreService } from '../modules/pie-store/queries/find-pie-stores/find-pie-stores.service';

process.env.APP_ENV = 'development';

export const main = async function (event: {
  httpMethod: any;
  path: string;
  body: FindPieStoreRequestDto;
}) {
  try {
    const method = event.httpMethod;

    const findPieStoresHttpController = new FindPieStoreHttpController(
      new FindPieStoreService(new PieStoreRepository()),
    );

    if (method === 'GET') {
      const pieStores = await findPieStoresHttpController.findPieStore({
        body: {
          pieStoreSlug: event.body.pieStoreSlug,
        },
        httpMethod: 'GET',
        path: '/pie-stores',
      });
      return {
        statusCode: 200,
        headers: {},
        body: pieStores,
      };
    }

    // We only accept GET for now
    return {
      statusCode: 400,
      headers: {},
      body: 'We only accept GET /',
    };
  } catch (error: any) {
    const responses = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
      headers: {},
      body: JSON.stringify(responses),
    };
  }
};
