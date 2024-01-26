import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "task",
      columns: [
        { name: "title", type: "string" },
        { name: "importance", type: "string" },
        { name: "description", type: "string" },
        { name: "create_date_at", type: "number" }
      ]
    }),
    tableSchema({
      name: "remarks",
      columns: [
        { name: "body", type: "string" },
        { name: "task_id", type: "number", isIndexed: true }
      ]
    })
  ]
});