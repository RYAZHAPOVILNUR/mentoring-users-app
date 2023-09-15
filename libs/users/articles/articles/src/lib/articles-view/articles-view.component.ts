import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from "ngx-quill";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { Article } from '@users/users/articles/data-access';
import { MatListModule } from "@angular/material/list";

@Component({
  selector: 'users-articles-view',
  standalone: true,
  imports: [CommonModule,
    QuillModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatIconModule, MatListModule
  ],
  templateUrl: './articles-view.component.html',
  styleUrls: ['./articles-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewComponent {
  @Input({ required: true }) articles!: Article[];
  @Input({required: true}) loggedUserId!: number;

  public clearArticleContent(content: string) {
    return content.replace(/<[^>]*>/g, ' ')
  }
}
