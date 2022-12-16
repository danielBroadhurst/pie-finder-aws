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

import { ReviewMap } from '../modules/pie-store/mappers/ReviewMap';
import { addPieStoreReviewUseCase } from '../modules/pie-store/use-cases';

process.env.APP_ENV = 'development';

export const main = async function(event: { httpMethod: any; path: string }) {
  try {
    var method = event.httpMethod;

    if (method === 'POST') {
      const reviewOrError = await addPieStoreReviewUseCase.execute({
        title: 'A Pie Store Review',
        userId: 'aUserId',
        pieStoreSlug: 'the-new-pie-store',
        userReview: 'the pie store was awesome',
      });
      if (reviewOrError.isFailure) {
        throw new Error(reviewOrError.errorValue());
      }
      return {
        statusCode: 200,
        headers: {},
        body: ReviewMap.toPersistence(reviewOrError.getValue()),
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
