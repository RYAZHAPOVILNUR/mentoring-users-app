import { Component, ViewEncapsulation, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from "ngx-quill";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Article } from '../../../../data-access/src';
import { MatIconModule } from '@angular/material/icon';
import { Observable, map } from 'rxjs';
import { AuthFacade } from '@auth/data-access';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'article-read',
  standalone: true,
  imports: [CommonModule,
    QuillModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    PushPipe,
  ],
  templateUrl: './article-read.component.html',
  styleUrls: ['./article-read.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ArticleReadComponent {

  @Input({ required: true }) article!: Article | null;
  @Input({required: true}) loggedUserId!: number;

  private readonly facade = inject(AuthFacade)
  public readonly userPhoto: Observable<string | undefined> = this.facade.user$.pipe(map(user => user.photo?.url))
  public readonly photo = this.userPhoto ? this.userPhoto : ''

  public clearArticleContent(content: string) {
    return content.replace(/<[^>]*>/g, ' ')
  };
}