const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  appEntrypoint: 'infrastructure/main.ts',
  name: 'dbroadhurst',

  deps: [/* Runtime dependencies of this module. */
    '@pepperize/cdk-organizations',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/util-dynamodb',
    'ulid',
  ],
  scripts: {
    'dynamodb:install': './install-dynamo-local.sh',
    'dynamodb:run': 'java -Djava.library.path=./DynamoDBLocal_lib -jar ./dynamodb/DynamoDBLocal.jar -sharedDb',
    'dynamodb:table-init': 'POPULATE_DB=TRUE APP_ENV=development ts-node ./src/data-store/local/setup-database',
    'app:run': 'APP_ENV=development ts-node ./src/handlers',
  },
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  packageName: 'pie-finder-serverless',
});
project.synth();