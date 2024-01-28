// TaskModel.ts
import { Model } from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators'

class TaskModel extends Model {
  static table = 'tasks';

  @field('heading')
    heading!: string;
  @field('subHeading')
    subHeading!: string;
  @field('task')
    task!: string;
  @field('selectedDate')
    selectedDate!: number;
}

export default TaskModel;
