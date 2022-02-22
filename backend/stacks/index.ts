import * as sst from "@serverless-stack/resources";
import ApiStack from "./ApiStack";
import AuthStack from "./AuthStack";
import StorageStack from "./StorageStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  // Add more stacks
  const storageStack = new StorageStack(app, "storage");

  const api = new ApiStack(app, "api", {
    table: storageStack.table,
  });

  if (api.api) {
    new AuthStack(app, "auth", {
      api: api.api,
      bucket: storageStack.bucket,
    });
  }
}
