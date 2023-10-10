import { inject, Injectable } from "@angular/core";
import { backlogAction } from "./backlog.action";
import { Store } from "@ngrx/store";
import { selectBacklogEntities, selectBacklogs } from "./backlog.selector";


@Injectable({ providedIn: 'root' })
export class BacklogFacade {
  private store = inject(Store);

  public readonly backlog$ = this.store.select(selectBacklogs);
  public readonly backlogEntities$ = this.store.select(selectBacklogEntities);

  initBacklog() {
    this.store.dispatch(backlogAction.loadBacklog());
  }

  deleteBacklog(id: number) {
    this.store.dispatch(backlogAction.deleteBacklog({ id }));
  }

}
