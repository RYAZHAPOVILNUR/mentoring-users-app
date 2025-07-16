import { Task } from './task.interface';

export interface Column {
  columnName: string;
  tasks: Task[];
}
