import { withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommentsActions } from './comments.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from '@users/core/http';
import { CreateComment } from '../../models/create-comment.model';
import { Comment } from '../../models/user-comment.model';
import { AuthFacade } from '@auth/data-access';

export const publishComment$ = createEffect(
  (actions$ = inject(Actions),
  store = inject(Store),
  auth$ = inject(AuthFacade),
    apiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(CommentsActions.publishComment),
      withLatestFrom(auth$.user$),
      switchMap( 
        ([{ comment }, user]) => {
          console.log(user);

          const author = {
            id: user.id,
            name: user.name,
            username: user.username,
            photo: {
              url: user.photo!.url
            }
            
          }
          
          return apiService.post<Comment, CreateComment>('/comments', comment).pipe(
            map((comment) => CommentsActions.publishCommentSuccess({ comment : {...comment, author} })),
            catchError((error) => {
              console.error('Error', error);
              return of(CommentsActions.publishCommentFailed({ error }))
            })
          )
        }
      )
    )
  }, { functional: true }
)

export const loadComments$ = createEffect(
  (actions$ = inject(Actions),
    apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(CommentsActions.loadComments),
      switchMap(
        ({articleId}) => apiService.get<Comment[]>(`/commentsByArticle/${articleId}`).pipe(
          map(
            (comments) => CommentsActions.loadCommentsSuccess({ comments })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(CommentsActions.loadCommentsFailed({ error }))
          })
        )
      ),
    )
  }, { functional: true }
)
export const deleteComment$ = createEffect(
  (actions$ = inject(Actions),
    apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(CommentsActions.deleteComment),
      switchMap(
        ({id}) => {
          return apiService.delete<number>(`/comments/${id}`).pipe(
            map(
              () => CommentsActions.deleteCommentSuccess({ id })
            ),
            catchError((error) => {
              console.error('Error', error);
              return of(CommentsActions.deleteCommentFailed({error}))
            })
          )
        }
      )
    )
  }, {functional: true}
)
