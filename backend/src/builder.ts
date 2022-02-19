import SchemaBuilder from "@pothos/core";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";

export const builder = new SchemaBuilder({
  plugins: [SimpleObjectsPlugin],
});

builder.queryType({});
builder.mutationType({});
// we tell builder to create a field under mutation that is named
// createTodo.
builder.mutationField("createTodo", (t) =>
  t.field({
    // this is the return type of our resolver. You can return
    // numbers, strings, boolean, etc
    type: "String",

    // the resolver function -> this fx is called when this mutation is
    // invoked
    resolve: () => "Hello World",
  })
);

// we tell builder to create a field under query field that is named
// getTodos.
builder.queryField("getTodos", (t) =>
  t.field({
    type: "String",
    resolve: () => "Hello World",
  })
);
