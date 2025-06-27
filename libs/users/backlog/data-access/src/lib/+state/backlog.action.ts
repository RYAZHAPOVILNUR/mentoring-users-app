import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CreateBacklog, IBacklog } from '../model/backlog.model';

export const backlogAction = createActionGroup({
  source: 'backlog',
  events: {
    loadBacklog: emptyProps(),
    loadBacklogSuccess: props<{ backlogs: IBacklog[] }>(),
    deleteBacklog: props<{ id: number }>(),
    deleteBacklogSuccess: props<{ id: number }>(),
    addBacklog: props<{ backlogData: CreateBacklog }>(),
    addBacklogSuccess: props<{ backlogData: IBacklog }>(),
  },
});
