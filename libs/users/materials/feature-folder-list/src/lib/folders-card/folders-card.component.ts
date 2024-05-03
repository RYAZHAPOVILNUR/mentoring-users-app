import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
})
export class FoldersCardComponent {
  @Input() folder!: Folder;
  private readonly materialsFaced = inject(MaterialsFacade);
  private readonly router = inject(Router);


  get date(){
    const date = new Date(this.folder.created_at);
    return date.toLocaleString('default', {day: "numeric", year: "numeric", month: 'short' })
  }

  onClick(){
    this.router.navigate(['/materials', this.folder.id])
  }

  onDelete(){
    this.materialsFaced.delete(this.folder.id)
  }
}
