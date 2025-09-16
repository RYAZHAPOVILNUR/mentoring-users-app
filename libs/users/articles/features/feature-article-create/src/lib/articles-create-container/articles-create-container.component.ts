import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { map } from 'rxjs';

import { ConfirmDialogService } from '@shared/ui-confirm-dialog';
import { ArticlesFacade, CreateArticle } from '@users/articles/data-access-article';

import { ArticlesCreateUiComponent } from '../articles-create-ui/articles-create-ui.component';

@Component({
  imports: [CommonModule, LetDirective, MatProgressBarModule, ArticlesCreateUiComponent],
  templateUrl: './articles-create-container.component.html',
  styleUrls: ['./articles-create-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesCreateContainerComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly articleFacade = inject(ArticlesFacade);
  @ViewChild(ArticlesCreateUiComponent) articleForm!: ArticlesCreateUiComponent;

  public readonly editingArticle$ = this.articleFacade.articleForEdit$;
  public readonly confirmDialogService = inject(ConfirmDialogService);

  public readonly articleId = this.activatedRoute.snapshot.queryParamMap.get('id');

  readonly isEdit = Boolean(this.articleId);

  ngOnInit(): void {
    this.articleFacade.loadArticle();
  }

  onAddArticle(article: CreateArticle) {
    this.articleFacade.addArticle(article);
  }
  onEditArticle(article: CreateArticle) {
    this.articleFacade.updateArticle(article);
  }

  canDeactivate() {
    if (this.articleForm.formGroup.dirty) {
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
    return true;
  }
}
