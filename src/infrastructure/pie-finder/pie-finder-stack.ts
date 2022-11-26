import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PieStoreService } from '../functions/pie-store-service';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PieFinderStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new PieStoreService(this, 'PieStoreService');
  }
}
