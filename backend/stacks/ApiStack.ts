import * as sst from "@serverless-stack/resources";

interface ApiStackProps extends sst.StackProps {
  table: sst.Table;
}

export default class ApiStack extends sst.Stack {
  // Reference to api
  public readonly api?: sst.GraphQLApi;

  constructor(app: sst.App, id: string, props?: ApiStackProps) {
    super(app, id, props);
    if (props) {
      const { table } = props;

      this.api = new sst.GraphQLApi(this, "Api", {
        server: "src/lambda.handler",
        defaultFunctionProps: {
          environment: {
            TABLE_NAME: table.dynamodbTable.tableName,
          },
        },
      });

      this.api.attachPermissions([table]);

      // Show end point url in the console
      this.addOutputs({
        ApiEndpoint: this.api.url,
      });
    }
  }
}
