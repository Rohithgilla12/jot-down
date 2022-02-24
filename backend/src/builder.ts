import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import type PrismaTypes from "../prisma/generated";
import { db } from "./../prisma/client";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    ID: { Input: string; Output: string | number };
    DateTime: { Input: Date; Output: Date };
  };
}>({
  plugins: [SimpleObjectsPlugin, PrismaPlugin],
  prisma: {
    client: db,
  },
});
