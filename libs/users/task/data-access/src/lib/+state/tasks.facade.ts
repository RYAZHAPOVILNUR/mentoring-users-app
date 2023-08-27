import { inject, Injectable } from '@angular/core';
import { tasksAction } from "./tasks.action";
import { selectColumns } from './tasks.selector';
import { IColumn } from '../model/tasks.interface';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})

export class TasksFacade {  
  private readonly store = inject(Store)
  public allTaskColumns$ = this.store.select(selectColumns);
 
getMyBoard() {
  this.store.dispatch(tasksAction.loadMyBoard());
}
getAllBoards(){
  this.store.dispatch(tasksAction.loadBoards());
}
updateColumns(columns: IColumn[]){
  console.log("Dispatch works", tasksAction.updateColumns({columns}));
  this.store.dispatch(tasksAction.updateColumns({columns}));
}
deleteColumn(columnIndex: number) {
  this.store.dispatch(tasksAction.deleteColumn({ columnIndex }));
}
}