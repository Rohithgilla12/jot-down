import { builder } from "../builder";

const NoteRef = builder.prismaObject("Note", {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id), 10) }),
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title", { nullable: true }),
    content: t.exposeString("content", { nullable: true }),
    author: t.relation("author"),
  }),
});

export const CreateNoteResult = builder.simpleObject("CreateNoteResult", {
  fields: (t) => ({
    note: t.field({ type: NoteRef }),
  }),
});
