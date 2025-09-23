import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Comment } from '@users/shared/data-access-models';

import { CreateComment } from '../interface/create-comment.interface';

export const commentsActions = createActionGroup({
  source: 'Comments',
  events: {
    add: props<{ comment: CreateComment }>(),
    addSuccess: props<{ comment: Comment }>(),
    addFailed: props<{ error: Error }>(),

    getAll: emptyProps(),
    getAllSuccess: props<{ comments: Comment[] }>(),
    getAllFailed: props<{ error: Error }>(),

    delete: props<{ id: number }>(),
    deleteSuccess: props<{ id: number }>(),
    deleteFailed: props<{ error: Error }>(),
  },
});
