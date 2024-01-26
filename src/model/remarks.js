import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";

export default class Remarks extends Model {
  static table = "remarks";

  static associations = {
    task: { type: "belongs_to", key: "task_id" }
  };

  @field("body") body;

  @relation("task", "task_id") task;
}