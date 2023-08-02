import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-article-read-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-read-container.component.html',
  styleUrls: ['./article-read-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ArticleReadContainerComponent {
  private readonly store = inject(Store);
}
