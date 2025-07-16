import { Column } from '../interfaces/column.interface';
import { Task } from '../interfaces/task.interface';

function filterTasksByTerm(tasks: Task[], term: string): Task[] {
  return tasks.filter((task) => task.taskName.includes(term));
}

export function filterColumnsByTerm(columns: Column[], term: string): Column[] {
  return columns.map((column) => {
    const filteredTasks = filterTasksByTerm(column.tasks, term);
    return { ...column, tasks: filteredTasks };
  });
}
