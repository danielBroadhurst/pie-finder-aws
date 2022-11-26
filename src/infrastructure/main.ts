import { App } from 'aws-cdk-lib';
import { PieFinderOrganisationAccount } from './account/pie-finder-account';
import { rootStack } from './account/root-account';
import { PieFinderStack } from './pie-finder/pie-finder-stack';

// Create an organization
new PieFinderOrganisationAccount(rootStack);

const pieFinderApp = new App();

export const pieFinderStack = new PieFinderStack(pieFinderApp, 'PieFinder', {
  env: {
    region: 'eu-west-2',
    account: '581383034143',
  },
});

