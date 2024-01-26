/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';


import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { mySchema } from "./src/model/schema";
import { dbModels } from "./src/model/index.js";

const adapter = new SQLiteAdapter({
  dbName: "WatermelonDemo",
  schema: mySchema
});


const database = new Database({
  adapter,
  modelClasses: dbModels
});

AppRegistry.registerComponent(appName, () => App);
