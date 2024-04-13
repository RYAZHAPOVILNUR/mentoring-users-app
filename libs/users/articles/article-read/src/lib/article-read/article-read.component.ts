import { Component, ViewEncapsulation, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Article } from '../../../../data-access/src';
import { MatIconModule } from '@angular/material/icon';
import { UsersFacade } from '../../../../../users/data-access/src';
import { UsersListContainerStore } from '../../../../../users/feature-users-list/src/lib/users-list-container/users-list-container.store';
import { map, Observable } from 'rxjs';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'article-read',
  standalone: true,
  imports: [CommonModule, QuillModule, MatCardModule, RouterModule, MatButtonModule, MatIconModule, PushPipe],
  templateUrl: './article-read.component.html',
  styleUrls: ['./article-read.component.scss'],
  providers: [UsersListContainerStore],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ArticleReadComponent implements OnInit {
  @Input({ required: true }) article!: Article | null;
  @Input({ required: true }) loggedUserId!: number;
  private readonly componentStore = inject(UsersListContainerStore);
  private readonly userFacade = inject(UsersFacade);
  public authorPhoto$!: Observable<string | undefined>;
  public clearArticleContent(content: string) {
    return content.replace(/<[^>]*>/g, ' ');
  }
  ngOnInit(): void {
    this.authorPhoto$ = this.userFacade.getUserFromStore(this.article!.authorId).pipe(map((data) => data?.photo?.url));
  }
}
