import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../../data-access/src';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingStatus } from '../../../../../../core/data-access/src';
import {  ArticleCommentComponent } from './article-comment/article-comment.component';
import '@angular/common/locales/global/ru';

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
    ArticleCommentComponent
  ],
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentsComponent {

  public likesCount: number = 0;
  public isLikeActive: boolean = false;
  @Input() comments!: Comment[];
  @Input() status!: LoadingStatus;
  @Output() submitComment = new EventEmitter<string>();

  public formGroup = new FormGroup({
    commentText: new FormControl('', [Validators.maxLength(100)]),
  });

  onSubmitComment() {
    if (this.formGroup.valid && this.formGroup.value.commentText) {
      this.submitComment.emit(this.formGroup.value.commentText);
      this.formGroup.reset();
      return;
    }
    return;
  }
}
