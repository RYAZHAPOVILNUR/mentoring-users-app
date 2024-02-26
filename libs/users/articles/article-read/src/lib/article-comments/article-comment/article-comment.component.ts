import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
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
export class ArticleCommentComponent {
  private readonly languageService = inject(LanguageSwitchService);
  public likesCount: number = 0;
  public disLikesCount: number = 0;
  public isLikeActive: boolean = false;
  public isDisLikeActive: boolean = false;

  @Input({ required: true }) comment!: Comment;
  @Input({ required: true }) userId!: number;

  public onThumbUp() {
    this.likesCount = this.likesCount === 0 ? 1 : 0;
    this.isLikeActive = !this.isLikeActive;
  }
  public onThumbDown() {
    this.disLikesCount = this.disLikesCount === 0 ? 1 : 0;
    this.isDisLikeActive = !this.isDisLikeActive;
  }

  public get avatarSrc(): string {
    return this.comment.author.photo
      ? this.comment.author.photo.url
      : 'assets/img/1.png';
  }

  public get isLikesExists(): boolean {
    return this.likesCount > 0;
  }
  public get isDisLikesExists(): boolean {
    return this.disLikesCount > 0;
  }
}
