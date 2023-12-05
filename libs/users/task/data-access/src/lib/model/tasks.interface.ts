export interface ITaskBoard {
  id: number;
  created_at: number;
  email: string;
  authorId: number;
  columns: IColumn[];
  term: string;
  filteredColumns: IColumn[];
}

export interface ITask {
  taskName: string;
}

export interface IColumn {
  columnName: string;
  tasks: ITask[];
}
