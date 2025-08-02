import { DatePipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

import { Comment } from '@users/shared/data-access-models';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    DatePipe,
    NgIf,
  ],
  selector: 'users-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
})
export class ArticleCommentComponent {
  @Input({ required: true }) comment!: Comment;
  @Input({ required: true }) userId!: number;

  public likesCount = 0;
  public disLikesCount = 0;
  public isLikeActive = false;
  public isDisLikeActive = false;

  public onThumbUp() {
    this.likesCount = this.likesCount === 0 ? 1 : 0;
    this.isLikeActive = !this.isLikeActive;
  }

  public onThumbDown() {
    this.disLikesCount = this.disLikesCount === 0 ? 1 : 0;
    this.isDisLikeActive = !this.isDisLikeActive;
  }

  public get avatarSrc(): string {
    return this.comment.author?.photo ? this.comment.author.photo.url : 'assets/img/1.png';
  }

  public get isLikesExists(): boolean {
    return this.likesCount > 0;
  }

  public get isDisLikesExists(): boolean {
    return this.disLikesCount > 0;
  }
}
