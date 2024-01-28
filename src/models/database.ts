// database.ts
import { DatabaseAdapter, Model, Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schemas'; // Define your schema
import TaskModel from './TaskModel';
import { Class } from '@nozbe/watermelondb/types';

type ExtendedDatabaseOptions = {
  adapter: DatabaseAdapter;
  modelClasses: Class<Model>[] | Model[];
  actionsEnabled: boolean;
};

const adapter = new SQLiteAdapter({
  dbName: 'myDatabase',
  schema: mySchema,
});

const database = new Database({
  adapter,
  modelClasses: [TaskModel],
  actionsEnabled: true,
} as unknown as ExtendedDatabaseOptions);

export default database;
