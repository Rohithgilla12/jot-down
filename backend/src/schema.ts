import fs from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";
import path from "path";

import { builder } from "./builder";

export const schema = builder.toSchema({});

const schemaString = printSchema(lexicographicSortSchema(schema));

if (process.env.NODE_ENV !== "production") {
  fs.writeFileSync(path.join(process.cwd(), "./schema.gql"), schemaString);
}
