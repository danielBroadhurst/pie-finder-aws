import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

let client: null | DynamoDBClient = null;

export const getClient = (): DynamoDBClient => {
  if (client) {
    return client;
  }
  client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'eu-west-2',
    ...(process.env.APP_ENV === 'development' && {
      endpoint: 'http://localhost:8000',
      credentials: {
        accessKeyId: 'xxx',
        secretAccessKey: 'yyy',
      },
    }),
  });
  return client;
};
