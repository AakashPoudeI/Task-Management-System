
import { Model } from "@nozbe/watermelondb";
import { field, date, children } from "@nozbe/watermelondb/decorators";

export default class Task extends Model {
  static table = "task";

  static associations = {
    remarks: { type: "has_many", foreignKey: "task_id" }
  };

  @field("title") title;
  
  @field("importance") importance;
  @field("description") description;

  @date("create_date_at") createDateAt;

  @children("remarks") remarks;
}
