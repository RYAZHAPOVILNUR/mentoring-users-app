import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { tasksAction } from './tasks.action';
import { IColumn } from '../model/tasks.interface';
import { selectColumns } from './tasks.selector';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {  
    private readonly store = inject(Store)
    public allTaskColumns$ = this.store.select(selectColumns);
    public userEmail$ = this.store.select(state => state.tasksFeature.email);

   
  loadTasksData() {
    this.store.dispatch(tasksAction.loadBoard());
  }

  addColumn(columns: IColumn[]) {
    this.userEmail$.pipe(
      take(1),
      map(email => this.store.dispatch(tasksAction.postColumn({ columns, email })))
    ).subscribe();
  }

  deleteColumn(columnIndex: number) {
    this.store.dispatch(tasksAction.deleteColumn({ columnIndex}));
  }

}
