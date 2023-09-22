import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../../data-access/src';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingStatus } from '../../../../../../core/data-access/src';
import {RouterLink} from "@angular/router";
import {CommentsFacade} from "../../../../data-access/src/lib/+state/comments/comments.facade";
import {PushPipe} from "@ngrx/component";
import {ArticleCommentComponent} from "./article-comment/article-comment.component";
import {AuthFacade} from "../../../../../../core/auth/data-access/src";

@Component({
  selector: 'article-comments',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PushPipe,
    ArticleCommentComponent
  ],
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentsComponent {

  @Input() comments!: Comment[];
  @Input() status!: LoadingStatus;
  @Output() submitComment = new EventEmitter<string>();

  private authFacade = inject(AuthFacade);

  public readonly userId$ = this.authFacade.loggedUserId$;

  public formGroup = new FormGroup({
    commentText: new FormControl('', [Validators.maxLength(100)])
  })

  onSubmitComment() {
    if(this.formGroup.valid && this.formGroup.value.commentText) {
      this.submitComment.emit(
        this.formGroup.value.commentText
      )
      this.formGroup.reset()
      return;
    }
    return;
  }
}
