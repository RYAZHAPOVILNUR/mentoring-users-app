import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PushPipe } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingStatus } from '@shared/util-store';
import { AuthFacade } from '@users/core/data-access-auth';
import { Comment } from '@users/shared/data-access-models';

import { ArticleCommentComponent } from './article-comment/article-comment.component';

@Component({
  selector: 'users-article-details-comments',
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
    ArticleCommentComponent,
    TranslateModule,
  ],
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentsComponent {
  @Input() comments!: Comment[];
  @Input() status!: LoadingStatus;
  private authFacade = inject(AuthFacade);
  public readonly userId$ = this.authFacade.loggedUserId$;
  public formGroup = new FormGroup({
    commentText: new FormControl('', [Validators.maxLength(100)]),
  });
  @Output() submitComment = new EventEmitter<string>();

  onSubmitComment() {
    if (this.formGroup.valid && this.formGroup.value.commentText) {
      this.submitComment.emit(this.formGroup.value.commentText);
      this.formGroup.reset();
      return;
    }
    return;
  }
}
