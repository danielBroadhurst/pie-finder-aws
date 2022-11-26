import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

test('Snapshot', () => {
  const app = new App();
  const stack = new Stack(app);

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});