import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { QuillModule } from 'ngx-quill';
import { map, Observable } from 'rxjs';

import { Article } from '@users/core/data-access-models';
import { UsersFacade } from '@users/users/data-access-user';

@Component({
  selector: 'users-article-details',
  standalone: true,
  imports: [CommonModule, QuillModule, MatCardModule, RouterModule, MatButtonModule, MatIconModule, PushPipe],
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ArticleDetailsComponent implements OnInit {
  @Input({ required: true }) article!: Article | null;
  @Input({ required: true }) loggedUserId!: number;
  private readonly userFacade = inject(UsersFacade);
  public authorPhoto$!: Observable<string | undefined>;

  ngOnInit(): void {
    this.authorPhoto$ = this.userFacade.getUserFromStore(this.article!.authorId).pipe(map((data) => data?.photo?.url));
  }
  public clearArticleContent(content: string) {
    return content.replace(/<[^>]*>/g, ' ');
  }
}
