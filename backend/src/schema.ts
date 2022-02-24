import fs from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";
import path from "path";

import { builder } from "./builder";

import "./resolvers/notesResolver";
import "./resolvers/usersResolver";
import "./resolvers/resolver";

builder.scalarType("DateTime", {
  serialize: (date) => date.toISOString(),
  parseValue: (date) => {
    return new Date(date as string);
  },
});

export const schema = builder.toSchema({});

const schemaString = printSchema(lexicographicSortSchema(schema));

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  fs.writeFileSync(path.join(process.cwd(), "./schema.gql"), schemaString);
}
