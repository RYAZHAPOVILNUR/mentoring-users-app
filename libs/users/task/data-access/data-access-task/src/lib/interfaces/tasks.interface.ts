import { Column } from './column.interface';

export interface TaskBoard {
  id: number;
  created_at: number;
  email: string;
  authorId: number;
  columns: Column[];
  term: string;
  filteredColumns: Column[];
}
