import { builder } from "../builder";
import dynamodb from "../util/dynamodb";

const Note = builder.simpleObject("Note", {
  description:
    "The Note object with title, note, noteId, uid, createdAt, updatedAt",
  fields: (t) => ({
    sk: t.id(),
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
    args: { noteId: t.arg.string({ required: true }) },
    resolve: async (_, args) => {
      if (process.env.TABLE_NAME) {
        const result = await dynamodb.get({
          TableName: process.env.TABLE_NAME,
          Key: {
            uid: "rgilla",
            sk: args.noteId,
          },
        });

        if (!result.Item) {
          throw new Error("Note not found");
        }
        const note: any = result.Item;
        return note;
      }
    },
  })
);

// Create Note builder
builder.mutationField("createNote", (t) =>
  t.field({
    type: Note,
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
        const note: any = {
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
        return note;
      }
    },
  })
);

// builder.mutationField("updateNote", (t) =>
// t.field({
//     type: Note,
//     args: {
//     noteId: t.arg.id(),
//     title: t.arg.string({}),
//     note: t.arg.string({}),
//     uid: t.arg.string({}),
//     },
//     resolve: async (_, args) => {
//     if (process.env.TABLE_NAME) {
//         const note: any = {
//         title: args.title,
//         note: args.note,
//         uid: args.uid,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         };
//         const result = await dynamodb.update({
//         TableName: process.env.TABLE_NAME,
//         Key: {
//             uid: "rgilla",
//             noteId: args.noteId,
//         },
//         UpdateExpression:
//             "set title = :title, note = :note, updatedAt = :updatedAt",
//         ExpressionAttributeValues: {
//             ":title": args.title,
//             ":note": args.note,
//             ":updatedAt": new Date().toISOString(),
//         },

//         });
