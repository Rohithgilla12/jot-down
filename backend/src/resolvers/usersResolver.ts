import { builder } from "../builder";

builder.prismaObject("User", {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id), 10) }),
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    name: t.exposeString("name", { nullable: true }),
    profile: t.relation("profile", { nullable: true }),
    notes: t.relation("notes"),
    notesCount: t.relationCount("notes"),
  }),
});

builder.prismaObject("Profile", {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id), 10) }),
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user"),
    bio: t.exposeString("bio", { nullable: true }),
    userId: t.exposeID("userId"),
  }),
});
