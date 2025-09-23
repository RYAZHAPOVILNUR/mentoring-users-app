import { inject, Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { CreateComment } from '../interface/create-comment.interface';

// import { Comment } from '@users/shared/data-access-models';
import { commentsActions } from './comments.actions';
import * as commentsSelecetors from './comments.selectors';

@Injectable({ providedIn: 'root' })
export class CommentsFacade {
  private readonly store = inject(Store);
  public readonly comments$ = this.store.select(commentsSelecetors.selectAllComments);
  public readonly status$ = this.store.select(commentsSelecetors.selectStatus);

  getAll() {
    this.store.dispatch(commentsActions.getAll());
  }

  add(comment: CreateComment) {
    this.store.dispatch(commentsActions.add({ comment }));
  }
}
