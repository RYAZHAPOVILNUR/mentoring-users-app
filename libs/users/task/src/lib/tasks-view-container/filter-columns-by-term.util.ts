import { IColumn, ITask } from '@users/users/task/data-access';

function filterTasksByTerm(tasks: ITask[], term: string): ITask[] {
  return tasks.filter((task) => task.taskName.includes(term));
}

export function filterColumnsByTerm(columns: IColumn[], term: string): IColumn[] {
  return columns.map((column) => {
    const filteredTasks = filterTasksByTerm(column.tasks, term);
    return { ...column, tasks: filteredTasks };
  });
}
