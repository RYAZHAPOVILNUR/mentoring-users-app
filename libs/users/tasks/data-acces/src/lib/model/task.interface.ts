
export interface ITaskColum {
    id?: number;
    created_at?: number;
    email: string;
    authorId: number;
    column: {
      columnName: string;
      tasks: ITask
    };
  }
  export interface ITask{
    taskName: string;
    
  }
  