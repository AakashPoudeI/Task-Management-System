// schemas.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
    version:1,
  tables: [
    tableSchema({
      name: 'tasks',
      columns: [
        { name: 'heading', type: 'string' },
        { name: 'subHeading', type: 'string' },
        { name: 'task', type: 'string' },
        { name: 'selectedDate', type: 'number' },
      ],
    }),
    // Add more tables if needed
  ],
});
