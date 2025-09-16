import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Backlog } from '@users/shared/data-access-models';

import { CreateBacklog } from '../interfaces/create-backlog.interface';

export const backlogAction = createActionGroup({
  source: 'backlog',
  events: {
    loadBacklog: emptyProps(),
    loadBacklogSuccess: props<{ backlogs: Backlog[] }>(),
    deleteBacklog: props<{ id: number }>(),
    deleteBacklogSuccess: props<{ id: number }>(),
    addBacklog: props<{ backlogData: CreateBacklog }>(),
    addBacklogSuccess: props<{ backlogData: Backlog }>(),
  },
});
