import * as sst from "@serverless-stack/resources";
import * as iam from "aws-cdk-lib/aws-iam";

interface AuthStackProps extends sst.StackProps {
  api: sst.GraphQLApi;
  bucket: sst.Bucket;
}

export default class AuthStack extends sst.Stack {
  //public reference to Auth instance
  public readonly auth?: sst.Auth;

  constructor(app: sst.App, id: string, props?: AuthStackProps) {
    super(app, id, props);

    if (props) {
      const { api, bucket } = props;

      this.auth = new sst.Auth(this, "Auth", {
        cognito: {
          userPool: {
            signInAliases: { email: true },
          },
        },
      });

      this.auth.attachPermissionsForAuthUsers([
        api,
        new iam.PolicyStatement({
          actions: ["s3:*"],
          effect: iam.Effect.ALLOW,
          resources: [
            bucket.bucketArn +
              "/private/${cognito-identity.amazonaws.com:sub}/*",
          ],
        }),
      ]);

      if (this.auth) {
        this.addOutputs({
          Region: app.region,
          UserPoolId:
            this.auth.cognitoUserPool?.userPoolId ?? "UserPoolId null",
          IdentityPoolId: this.auth.cognitoCfnIdentityPool.ref,
          UserPoolClientId:
            this.auth.cognitoUserPoolClient?.userPoolClientId ??
            "UserPoolClientId null",
        });
      }
    }
  }
}
