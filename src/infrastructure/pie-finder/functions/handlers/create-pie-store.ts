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

import { CreatePieStoreHttpController } from '../../../../modules/pie-store/commands/create-pie-store/create-pie-store.http.controller';
import { CreatePieStoreService } from '../../../../modules/pie-store/commands/create-pie-store/create-pie-store.service';
import { PieStoreRepository } from '../../../../modules/pie-store/database/pie-store.repository';

process.env.APP_ENV = 'development';

export const main = async function (event: {
  httpMethod: any;
  path: string;
  body: any;
}) {
  try {
    const method = event.httpMethod;

    const createPieStoreController = new CreatePieStoreHttpController(
      new CreatePieStoreService(new PieStoreRepository()),
    );

    if (method === 'POST') {
      const pieStore = await createPieStoreController.create({
        body: {
          storeName: 'A New Pie Store',
          pieStoreSlug: 'the-new-pie-store',
          country: 'Pie Land',
          postalCode: 'PIE CODE',
          street: 'Pie Store Road',
        },
        httpMethod: 'POST',
        path: '/pie-store',
      });
      return {
        statusCode: 200,
        headers: {},
        body: pieStore,
      };
    }

    // We only accept POST for now
    return {
      statusCode: 400,
      headers: {},
      body: 'We only accept POST /',
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
