import { builder } from "../builder";
import dynamodb from "../util/dynamodb";

const User = builder.simpleObject("User", {
  description:
    "The User object with name, email, uid, createdAt, updatedAt, profileImage",
  fields: (t) => ({
    name: t.string({ nullable: true }),
    email: t.string(),
    uid: t.string(),
    createdAt: t.string({}),
    updatedAt: t.string({ nullable: true }),
    profileImage: t.string({ nullable: true }),
  }),
});

builder.queryField("getUser", (t) =>
  t.field({
    type: User,
    nullable: true,
    args: { uid: t.arg.string({ required: true }) },
    resolve: async (_, args) => {
      if (process.env.TABLE_NAME) {
        const result = await dynamodb.get({
          TableName: process.env.TABLE_NAME,
          Key: {
            uid: args.uid,
            sk: "profile",
          },
        });

        if (!result.Item) {
          throw new Error("User not found");
        }

        return {
          email: result.Item.email,
          name: result.Item.name,
          createdAt: result.Item.createdAt,
          updatedAt: result.Item.updatedAt,
          profileImage: result.Item.profileImage,
          uid: result.Item.uid,
        };
      }
    },
  })
);

builder.mutationField("createUser", (t) =>
  t.field({
    type: User,
    args: {
      name: t.arg.string({}),
      email: t.arg.string({ required: true }),
      uid: t.arg.id({ required: true }),
      profileImage: t.arg.string({}),
    },
    resolve: async (_, args) => {
      if (process.env.TABLE_NAME) {
        const user: any = {
          name: args.name,
          email: args.email,
          uid: args.uid,
          profileImage: args.profileImage,
          createdAt: new Date().toISOString(),
          updatedAt: null,
          sk: "profile",
        };
        const result = await dynamodb.put({
          TableName: process.env.TABLE_NAME,
          Item: user,
        });
        if (result.$response.error) {
          throw new Error("Some error occured");
        }
        return user;
      }
    },
  })
);
