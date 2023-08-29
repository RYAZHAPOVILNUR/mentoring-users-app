import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from "ngx-quill";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Article } from '../../../../data-access/src';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'article-read',
  standalone: true,
  imports: [CommonModule,
    QuillModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './article-read.component.html',
  styleUrls: ['./article-read.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ArticleReadComponent {

  @Input({ required: true }) article!: Article | null;
  @Input({required: true}) loggedUserId!: number;

  public clearArticleContent(content: string) {
    return content.replace(/<[^>]*>/g, ' ')
  };
