import { ChangeDetectionStrategy, Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Article } from '@users/users/articles/data-access';
import { ArticlesCreateButtonComponent } from '@users/users/articles/articles-create';
import { MatListModule } from '@angular/material/list';
import { PushPipe } from '@ngrx/component';
import { map, Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { UsersListContainerStore } from '../../../../../users/feature-users-list/src/lib/users-list-container/users-list-container.store';
import { UsersFacade } from '@users/users/data-access';
import { SettingsFacade } from '@users/settings/data-access';

@Component({
  selector: 'users-articles-view',
  standalone: true,
  imports: [
    CommonModule,
    QuillModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    ArticlesCreateButtonComponent,
    MatIconModule,
    MatListModule,
    PushPipe,
    MatButtonToggleModule,
    TranslateModule,
  ],
  templateUrl: './articles-view.component.html',
  styleUrls: ['./articles-view.component.scss'],
  providers: [UsersListContainerStore],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewComponent implements OnInit {
  @Input({ required: true }) articles!: Article[];
  @Input({ required: true }) article!: Article | null;
  @Input({ required: true }) loggedUserId!: number;

  private readonly componentStore = inject(UsersListContainerStore);
  private readonly userFacade = inject(UsersFacade);
  private readonly settingsFacade = inject(SettingsFacade);
  public authorPhoto$: Observable<string | undefined>[] = [];
  public authorArticle$: Observable<string | undefined>[] = [];
  public readonly viewStyleType$ = this.settingsFacade.articlesViewStyleType$;

  changeArticlesStyleType(styleType: string): void {
    this.settingsFacade.setArticlesStyleType(styleType);
  }

  public clearArticleContent(content: string) {
    return content.replace(/<[^>]*>/g, ' ');
  }

  preventRouterNavigation(event: Event) {
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.settingsFacade.getSettings();

    for (const article of this.articles) {
      this.authorPhoto$.push(this.userFacade.getUserFromStore(article.authorId).pipe(map((data) => data?.photo?.url)));
      this.authorArticle$.push(this.userFacade.getUserFromStore(article.authorId).pipe(map((data) => data?.username)));
    }
  }
}
