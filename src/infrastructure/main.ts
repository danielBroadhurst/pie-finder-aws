import { PieFinderOrganisationAccount } from './account/pie-finder-account';
import { app, rootStack } from './account/root-account';
import { PieFinderStack } from './pie-finder/pie-finder-stack';

// Create an organization
new PieFinderOrganisationAccount(rootStack);

export const pieFinderStack = new PieFinderStack(app, 'PieFinder', {
  env: {
    region: 'eu-west-2',
    account: '581383034143',
  },
});

