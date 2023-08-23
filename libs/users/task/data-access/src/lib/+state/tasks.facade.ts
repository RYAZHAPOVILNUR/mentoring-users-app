import { Injectable, inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as TaskSelectors from './tasks.selector';
import { tasksAction } from "./tasks.action";

@Injectable({providedIn: 'root'})

export class TaskFacade {
    private readonly store = inject(Store)


    public readonly allTaskColumns$ = this.store.pipe(select(TaskSelectors.selectColumn));


    getColumns(){
        this.store.dispatch(tasksAction.getTasksColumn());
    }
}