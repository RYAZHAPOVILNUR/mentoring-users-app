import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Article } from '@users/users/articles/data-access';
import { MatListModule } from '@angular/material/list';
import { UsersEntity } from "@users/core/data-access";


@Component({
  selector: 'users-articles-view',
  standalone: true,
  imports: [
    CommonModule,
    QuillModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './articles-view.component.html',
  styleUrls: ['./articles-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewComponent {
  @Input({ required: true }) articles!: Article[];
  @Input({ required: true }) loggedUserId!: number;
  @Input({ required: true }) allUsers!: UsersEntity[];

  public clearArticleContent(content: string) {
    return content.replace(/<[^>]*>/g, ' ');
  }

  preventRouterNavigation(event: Event) {
    event.stopPropagation();
  }

  public getUserAvatar(articleId: number) {
    const article = this.articles.find((articles) => articles.id === articleId);

    if (article) {
      const author = this.allUsers.find((author) => author.id === article.authorId);

      if(author) {
        return author.photo?.url
      }
    }
    return null
  }
}
