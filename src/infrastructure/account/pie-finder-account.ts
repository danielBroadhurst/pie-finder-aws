import {
  Account,
  FeatureSet,
  Organization,
  OrganizationalUnit,
} from '@pepperize/cdk-organizations';
import { Stack } from 'aws-cdk-lib';

export class PieFinderOrganisationAccount {
  pieFinderAccount: Account;

  constructor(scope: Stack) {
    const organization = new Organization(scope, 'Organization', {
      featureSet: FeatureSet.ALL,
    });

    const organizationUnit = new OrganizationalUnit(scope, 'PieFinder', {
      organizationalUnitName: 'PieFinder',
      parent: organization.root,
    });

    this.pieFinderAccount = new Account(scope, 'PieFinderDev', {
      accountName: 'PieFinder-dev',
      email: 'info+pie-finder@danielbroadhurst.co.uk',
      roleName: 'OrganizationAccountAccessRole',
      parent: organizationUnit,
    });
  }

  getPieFinderAccount() {
    return this.pieFinderAccount;
  }
}
