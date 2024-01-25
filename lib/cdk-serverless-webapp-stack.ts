import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { VPC } from './vpc';
import { webAppBucket } from './s3'

export class CdkServerlessWebappStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new VPC(this, "VPC");
    new webAppBucket(this, "webAppBucket");
  }
}
