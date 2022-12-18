import path from 'path';
import { Duration } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class PieStoreService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const getPieStoreHandler = new NodejsFunction(this, 'my-function', {
      memorySize: 128,
      timeout: Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main',
      entry: path.join(__dirname, '../../handlers/get-pie-store.ts'),
    });

    const api = new apigateway.RestApi(this, 'pie-store-api', {
      restApiName: 'Pie Store Service',
      description: 'This service serves Pie Stores.',
    });

    const getPieStoresIntegration = new apigateway.LambdaIntegration(getPieStoreHandler, {
      proxy: true,
    });

    api.root.addMethod('GET', getPieStoresIntegration); // GET /
  }
}