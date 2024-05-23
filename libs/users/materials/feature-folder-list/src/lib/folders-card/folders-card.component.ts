import { Component, Input, inject } from '@angular/core';
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
    MatIconModule,
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
})
export class FoldersCardComponent{
  @Input({required: true}) folder!: Folder;
  private readonly materialsFaced = inject(MaterialsFacade);
  private readonly router = inject(Router);
  
  public onClick(){
    this.router.navigate(['/materials', this.folder.id])
  }

  public onDelete(){
    this.materialsFaced.deleteFolder(this.folder.id)
  }
}
