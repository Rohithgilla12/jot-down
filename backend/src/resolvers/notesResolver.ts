import { builder } from "../builder";
import dynamodb from "../util/dynamodb";

const Note = builder.simpleObject("Note", {
  description:
    "The Note object with title, note, noteId, uid, createdAt, updatedAt",
  fields: (t) => ({
    id: t.string(),
    uid: t.string(),
    title: t.string({ nullable: true }),
    note: t.string({ nullable: true }),
    createdAt: t.string({}),
    updatedAt: t.string({ nullable: true }),
  }),
});

builder.queryField("getNote", (t) =>
  t.field({
    type: Note,
    nullable: true,
    args: { id: t.arg.string({ required: true }) },
    resolve: async (_, args) => {
      if (process.env.TABLE_NAME) {
        const result = await dynamodb.get({
          TableName: process.env.TABLE_NAME,
          Key: {
            uid: "rgilla",
            sk: args.id,
          },
        });

        if (!result.Item) {
          throw new Error("Note not found");
        }

        return {
          id: result.Item.sk,
          uid: result.Item.uid,
          title: result.Item.title,
          note: result.Item.note,
          createdAt: result.Item.createdAt,
          updatedAt: result.Item.updatedAt,
        };
      }
    },
  })
);

// Create Note builder
builder.mutationField("createNote", (t) =>
  t.field({
    type: Note,
    nullable: true,
    args: {
      title: t.arg.string({}),
      note: t.arg.string({ required: true }),
      uid: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      if (process.env.TABLE_NAME) {
        //Generate random id
        const noteId =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        const note = {
          title: args.title,
          note: args.note,
          uid: args.uid,
          sk: noteId,
          createdAt: new Date().toISOString(),
          updatedAt: null,
        };
        const result = await dynamodb.put({
          TableName: process.env.TABLE_NAME,
          Item: note,
        });

        if (result.$response.error) {
          throw new Error("Not able to create note");
        }
        return {
          title: args.title,
          note: args.note,
          uid: args.uid,
          id: noteId,
          createdAt: new Date().toISOString(),
          updatedAt: null,
        } as any;
      }
    },
  })
);
