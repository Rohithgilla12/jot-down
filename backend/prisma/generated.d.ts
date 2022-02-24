import type { Prisma, Note, Profile, User } from "/Users/rohithgilla/Desktop/Life/sidekicks/jot-down/backend/node_modules/@prisma/client";
export default interface PrismaTypes {
    Note: {
        Name: "Note";
        Shape: Note;
        Include: Prisma.NoteInclude;
        Where: Prisma.NoteWhereUniqueInput;
        Fields: "author";
        ListRelations: never;
        Relations: {
            author: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Profile: {
        Name: "Profile";
        Shape: Profile;
        Include: Prisma.ProfileInclude;
        Where: Prisma.ProfileWhereUniqueInput;
        Fields: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Where: Prisma.UserWhereUniqueInput;
        Fields: "notes" | "profile";
        ListRelations: "notes";
        Relations: {
            notes: {
                Shape: Note[];
                Types: PrismaTypes["Note"];
            };
            profile: {
                Shape: Profile | null;
                Types: PrismaTypes["Profile"];
            };
        };
    };
}