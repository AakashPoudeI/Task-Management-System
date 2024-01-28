// types.ts
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  TaskDetailScreen: { task: any; onDelete?: () => void };
  // Add other screen definitions as needed
};

export type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetailScreen'>;

export type RouteParams = {
  route: TaskDetailScreenRouteProp;
};
