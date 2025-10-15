import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { map } from 'rxjs';

import { ConfirmDialogService } from '@shared/ui-confirm-dialog';
import { DeactivatableComponent } from '@shared/util-router';
import { ArticlesFacade, ArticleVM } from '@users/articles/data-access-article';

import { ArticlesCreateUiComponent } from '../articles-create-ui/articles-create-ui.component';

@Component({
  standalone: true,
  imports: [CommonModule, LetDirective, MatProgressBarModule, ArticlesCreateUiComponent],
  templateUrl: './articles-create-container.component.html',
  styleUrls: ['./articles-create-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesCreateContainerComponent implements OnInit, DeactivatableComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly articleFacade = inject(ArticlesFacade);

  @ViewChild(ArticlesCreateUiComponent, { static: true })
  readonly articlesCreateUiComponent!: ArticlesCreateUiComponent;

  public readonly editingArticle$ = this.articleFacade.articleForEdit$;
  public readonly confirmDialogService = inject(ConfirmDialogService);

  public readonly articleId = this.activatedRoute.snapshot.queryParamMap.get('id');

  readonly isEdit = Boolean(this.articleId);

  ngOnInit(): void {
    this.articleFacade.getOne();
  }

  onAddArticle(article: ArticleVM) {
    this.articleFacade.add(article);
  }

  onEditArticle(article: ArticleVM) {
    this.articleFacade.update(article);
  }

  canDeactivate() {
    if (!this.articlesCreateUiComponent?.formGroup.dirty) {
      return true;
    }
    return this.confirmDialogService
      .open({
        title: 'Подтверждение выхода',
        content: 'Вы уверены, что хотите покинуть данную страницу?<br>Несохранённые изменения будут утеряны!',
        primaryButtonText: 'Покинуть страницу',
        secondaryButtonText: 'Остаться',
      })
      .afterClosed()
      .pipe(map(Boolean));
  }
}
