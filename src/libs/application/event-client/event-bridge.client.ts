import { EventBridgeClient } from '@aws-sdk/client-eventbridge';

let client: null | EventBridgeClient = null;

export const getEventClient = (): EventBridgeClient => {
  if (client) {
    return client;
  }
  client = new EventBridgeClient({
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
