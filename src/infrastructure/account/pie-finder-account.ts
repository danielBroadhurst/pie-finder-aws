import {
  Account,
  FeatureSet,
  Organization,
  OrganizationalUnit,
  Policy,
  PolicyType,
} from '@pepperize/cdk-organizations';
import { Stack } from 'aws-cdk-lib';

export class PieFinderOrganisationAccount {
  constructor(scope: Stack) {
    const organization = new Organization(scope, 'Organization', {
      featureSet: FeatureSet.ALL,
    });

    const organizationUnit = new OrganizationalUnit(scope, 'PieFinder', {
      organizationalUnitName: 'PieFinder',
      parent: organization.root,
    });

    const account = new Account(scope, 'PieFinderDev', {
      accountName: 'PieFinder-dev',
      email: 'info+pie-finder@danielbroadhurst.co.uk',
      roleName: 'OrganizationAccountAccessRole',
      parent: organizationUnit,
    });

    const policy = new Policy(scope, 'Policy', {
      content: JSON.stringify({
        Version: '2012-10-17',
        Statement: { Effect: 'Deny', Action: ['ec2:*'], Resource: '*' },
      }),
      description:
        'Disable EC2 Permissions for Account',
      policyName: 'DenyAllEC2Actions',
      policyType: PolicyType.SERVICE_CONTROL_POLICY,
    });

    organizationUnit.attachPolicy(policy);
    account.attachPolicy(policy);
  }
}
