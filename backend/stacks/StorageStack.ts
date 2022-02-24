import * as sst from "@serverless-stack/resources";
import { HttpMethods } from "aws-cdk-lib/aws-s3";

export default class StorageStack extends sst.Stack {
  // Reference to the storage bucket
  public readonly bucket: sst.Bucket;

  // Reference to the dynamodb table
  // public readonly table: sst.Table;

  constructor(app: sst.App, id: string, props?: sst.StackProps) {
    super(app, id, props);

    this.bucket = new sst.Bucket(this, "Uploads", {
      s3Bucket: {
        cors: [
          {
            maxAge: 3000,
            allowedOrigins: ["*"],
            allowedHeaders: ["*"],
            allowedMethods: [
              HttpMethods.GET,
              HttpMethods.PUT,
              HttpMethods.DELETE,
              HttpMethods.POST,
              HttpMethods.HEAD,
            ],
          },
        ],
      },
    });

    // this.table = new sst.Table(this, "just-jot", {
    //   fields: {
    //     uid: sst.TableFieldType.STRING,
    //     sk: sst.TableFieldType.STRING,
    //   },
    //   primaryIndex: {
    //     partitionKey: "uid",
    //     sortKey: "sk",
    //   },
    // });

    this.addOutputs({
      bucket: this.bucket.bucketName,
      // table: this.table.tableArn,
    });
  }
}
