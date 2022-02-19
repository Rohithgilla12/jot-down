import * as sst from "@serverless-stack/resources";
import ApiStack from "./ApiStack";
import StorageStack from "./StorageStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  // Add more stacks
  const storageStack = new StorageStack(app, "storage");

  new ApiStack(app, "api", {
    table: storageStack.table,
  });
}
