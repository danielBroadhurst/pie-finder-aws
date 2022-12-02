/* eslint-disable import/no-extraneous-dependencies */
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

exports.main = async function(event: { httpMethod: any; path: string }) {
  try {
    var method = event.httpMethod;

    if (method === 'GET') {
      return {
        statusCode: 200,
        headers: {},
        body: JSON.stringify({ pieStore: { name: 'first pie store' } }),
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
