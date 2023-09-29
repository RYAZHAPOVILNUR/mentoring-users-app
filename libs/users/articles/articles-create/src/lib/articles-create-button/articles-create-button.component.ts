import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'users-articles-create-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './articles-create-button.component.html',
  styleUrls: ['./articles-create-button.component.scss'],
})
export class ArticlesCreateButtonComponent {
  constructor(private router: Router) {}

  openCreateArticle(): void {
    this.router.navigate(['/article-editor'], {
      queryParams: { mode: 'create' },
    });
  }
}
