export interface IBacklog {
  id: number;
  created_at: number;
  todos_id: number;
  teams_id: number;
  title: string;
  description: string;
}

export interface CreateBacklog {
  title: string;
  todos_id?: 0;
  teams_id?: 0;
  description?: string;
}