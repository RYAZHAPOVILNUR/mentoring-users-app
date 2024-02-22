import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'users-material-folder-add-btn',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './material-folder-add-btn.component.html',
  styleUrls: ['./material-folder-add-btn.component.scss'],
})
export class MaterialFolderAddBtnComponent {}
