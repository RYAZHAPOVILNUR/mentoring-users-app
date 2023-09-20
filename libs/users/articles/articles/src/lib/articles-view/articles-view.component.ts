import { ChangeDetectionStrategy, Component, Input,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from "ngx-quill";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { Article } from '@users/users/articles/data-access';
import { MatListModule } from "@angular/material/list";
import { Observable, map } from 'rxjs';
import { AuthFacade } from '@auth/data-access';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'users-articles-view',
  standalone: true,
  imports: [CommonModule,
    QuillModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatIconModule, MatListModule,
    PushPipe
  ],
  templateUrl: './articles-view.component.html',
  styleUrls: ['./articles-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewComponent {
  @Input({ required: true }) articles!: Article[];
  @Input({required: true}) loggedUserId!: number;

  private readonly facade = inject(AuthFacade)
  public readonly userPhoto: Observable<string | undefined> = this.facade.user$.pipe(map(user => user.photo?.url))
  public readonly photo = this.userPhoto ? this.userPhoto : ''

  public clearArticleContent(content: string) {
    return content.replace(/<[^>]*>/g, ' ')
  }

  preventRouterNavigation(event: Event) {
    event.stopPropagation()}
}
