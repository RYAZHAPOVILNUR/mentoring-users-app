import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-article-read',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-read.component.html',
  styleUrls: ['./article-read.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ArticleReadComponent {

}
