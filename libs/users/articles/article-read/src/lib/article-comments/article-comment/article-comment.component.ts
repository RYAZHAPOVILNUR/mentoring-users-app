import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PushPipe } from '@ngrx/component';
import { LanguageSwitchService } from '../../../../../../core/ui/language-switch/src';
import { Comment } from '../../../../../data-access/src';
import { RouterLink } from '@angular/router';
@Component({
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
    RouterLink,
  ],
  selector: 'article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
})
export class ArticleCommentComponent implements OnChanges {
  @Input({ required: true }) comment!: Comment;
  @Input({ required: true }) userId!: number;  
  @Output() thumbUp = new EventEmitter();
  @Output() thumbDown = new EventEmitter();

  private readonly languageService = inject(LanguageSwitchService);
  public likesCount: number = 0;
  public disLikesCount: number = 0;
  public isLikeActive: boolean = false;
  public isDisLikeActive: boolean = false;

  ngOnChanges() {
    if (this.comment) {
      this.likesCount = this.comment.like_user_ids.length
      this.disLikesCount = this.comment.dislike_user_ids.length
      this.isLikeActive = this.comment.like_user_ids.includes(this.comment.author_id) ? true : false
      this.isDisLikeActive = this.comment.dislike_user_ids.includes(this.comment.author_id) ? true : false
    }
  }

  public onThumbUp() {
    const commentId = this.comment.id
    let comment = {
      article_id: this.comment.article_id,
      author_id: this.comment.author_id,
      text: this.comment.text,
      like_user_ids: this.comment.like_user_ids,
      dislike_user_ids: this.comment.dislike_user_ids,
    }
    if (!this.isLikeActive) {
      comment = {
        ...comment,
        like_user_ids: [...this.comment.like_user_ids, this.userId],
      }
      if (this.comment.dislike_user_ids.includes(this.userId)) {
        comment = {
          ...comment,
          dislike_user_ids: this.comment.dislike_user_ids.filter(id => id !== this.userId),
        }
      }
    } else {
      comment = {
        ...comment,
        like_user_ids: this.comment.like_user_ids.filter(id => id !== this.userId),
      }
    }
    this.thumbUp.emit({comment, commentId})
  }
  public onThumbDown() {
    const commentId = this.comment.id
    let comment = {
      article_id: this.comment.article_id,
      author_id: this.comment.author_id,
      text: this.comment.text,
      like_user_ids: this.comment.like_user_ids,
      dislike_user_ids: this.comment.dislike_user_ids,
    }
    if (!this.isDisLikeActive) {
      comment = {
        ...comment,
        dislike_user_ids: [...this.comment.dislike_user_ids, this.userId],
      }
      if (this.comment.like_user_ids.includes(this.userId)) {
        comment = {
          ...comment,
          like_user_ids: this.comment.dislike_user_ids.filter(id => id !== this.userId),
        }
      }
    } else {
      comment = {
        ...comment,
        dislike_user_ids: this.comment.dislike_user_ids.filter(id => id !== this.userId),
      }
    }
    this.thumbDown.emit({comment, commentId})
  }

  public get avatarSrc(): string {
    return this.comment.author.photo ? this.comment.author.photo.url : 'assets/img/1.png';
  }

  public get isLikesExists(): boolean {
    return this.likesCount > 0;
  }
  public get isDisLikesExists(): boolean {
    return this.disLikesCount > 0;
  }
}
