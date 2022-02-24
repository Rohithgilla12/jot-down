import { db } from "../../prisma/client";
import { builder } from "../builder";
import { CreateNoteResult } from "./notesResolver";

const DEFAULT_PAGE_SIZE = 10;

builder.queryType({
  fields: (t) => ({
    user: t.prismaField({
      type: "User",
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (query, root, args) =>
        db.user.findUnique({
          ...query,
          where: { id: Number.parseInt(String(args.id), 10) },
        }),
    }),
    profile: t.prismaField({
      type: "Profile",
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (query, root, args) =>
        db.profile.findUnique({
          ...query,
          where: { id: Number.parseInt(String(args.id), 10) },
        }),
    }),
    note: t.prismaField({
      type: "Note",
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (query, root, args) =>
        db.note.findUnique({
          ...query,
          where: { id: Number.parseInt(String(args.id), 10) },
        }),
    }),
    notes: t.prismaField({
      type: ["Note"],
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },
      resolve: (query, root, args) =>
        db.note.findMany({
          ...query,
          take: args.take ?? DEFAULT_PAGE_SIZE,
          skip: args.skip ?? 0,
        }),
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createUser: t.prismaField({
      type: "User",
      args: {
        email: t.arg.string({ required: true }),
        uid: t.arg.string({ required: true }),
      },
      resolve: async (query, _, args) => {
        const user = await db.user.create({
          data: {
            email: args.email,
            uid: args.uid,
            profile: {
              create: {
                bio: "",
              },
            },
          },
        });

        return db.user.findFirst({
          ...query,
          where: { id: user.id },
          rejectOnNotFound: true,
        });
      },
    }),
    createNote: t.field({
      type: CreateNoteResult,
      args: {
        title: t.arg.string({ required: true }),
        content: t.arg.string(),
        authorId: t.arg.int({ required: true }),
      },
      resolve: async (_, { title, content, authorId }) => {
        const note = await db.note.create({
          data: {
            title: title,
            content: content,
            authorId: authorId,
          },
        });

        return { note };
      },
    }),
  }),
});
