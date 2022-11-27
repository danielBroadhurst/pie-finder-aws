import { App, Stack } from 'aws-cdk-lib';

export const app = new App();
export const rootStack = new Stack(app, 'DanielBroadhurst', {
  env: {
    region: 'eu-west-2',
    account: '581782790003',
  },
});
