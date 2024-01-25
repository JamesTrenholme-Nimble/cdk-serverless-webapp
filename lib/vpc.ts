import * as cdk from "aws-cdk-lib";
import ec2 = require("aws-cdk-lib/aws-ec2");
import { Construct } from "constructs";

export class VPC extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const defaultVpc = new ec2.Vpc(this, "Vpc", {
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "pub",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "private",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });
    
    new ec2.GatewayVpcEndpoint(this, "s3Endpoint", {
      service: ec2.GatewayVpcEndpointAwsService.S3,
      vpc: defaultVpc,
      subnets: [defaultVpc.selectSubnets({
        subnetType: ec2.SubnetType.PUBLIC
      })]
    });


  }
}
