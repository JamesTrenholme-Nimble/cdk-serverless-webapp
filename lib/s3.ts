import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export class webAppBucket extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(scope, "cdkWebAppBucket", {
      bucketName: "cdk-web-app",
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: false,
      versioned: true,
      removalPolicy: RemovalPolicy.RETAIN,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.html",
      objectOwnership: s3.ObjectOwnership.OBJECT_WRITER,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    bucket.addToResourcePolicy(
      new PolicyStatement({
        principals: [new iam.AnyPrincipal()],
        actions: ["s3:GetObject"],
        resources: ["arn:aws:s3:::cdk-web-app", "arn:aws:s3:::cdk-web-app/*"],
        conditions: { 
          'IpAddress': {
              'aws:SourceIp': '185.158.243.65/16'
          }
        }
      })
    );
  }
}
