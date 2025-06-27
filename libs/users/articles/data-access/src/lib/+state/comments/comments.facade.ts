import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectComments, selectCommentsEntities } from './comments.selectors';
import { Comment } from '../../models/user-comment.model';

@Injectable({ providedIn: 'root' })
export class CommentsFacade {
  private readonly store = inject(Store);
  public readonly articles$: Observable<Comment[]> = this.store.select(selectComments);
  public readonly articlesEntities$ = this.store.select(selectCommentsEntities);
}
