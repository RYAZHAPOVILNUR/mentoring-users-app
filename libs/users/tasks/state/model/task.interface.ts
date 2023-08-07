export interface ITask {
    id: number;
    created_at: string;
    email: string;
    authorId: number;
    borders: {
      boardName: string;
      tasks: {
        taskName: string;
        task: string;
      }[];
    };
  }
  