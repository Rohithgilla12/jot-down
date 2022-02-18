import * as sst from "@serverless-stack/resources";
import StorageStack from "./StorageStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x"
  });


  // Add more stacks
  const storageStack = new StorageStack(app,"storage");

  console.log(storageStack.bucket.bucketName);
  console.log(storageStack.table.tableName);

  
}
