import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const TODOS_ROUTES: Routes = [
  { path: '', component: TodoListComponent },
];
