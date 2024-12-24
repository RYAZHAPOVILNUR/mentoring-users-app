import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FeatureFoldersCreateComponent } from '@users/feature-folders-create';
import { MatDialog } from '@angular/material/dialog';
import { IFolder } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatIconModule, MatButtonModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
})
export class FoldersListComponent {
  private dialog = inject(MatDialog);
  @Input({ required: true }) folders!: IFolder[];

  @Output() addFolder = new EventEmitter<string>();
  @Output() deleteFolder = new EventEmitter();

  public openDialog(): void {
    const dialogRef = this.dialog.open(FeatureFoldersCreateComponent);

    dialogRef.afterClosed().subscribe((folderName: string) => {
      if (folderName) {
        this.addFolder.emit(folderName);
      }
    });
  }

  public onDeleteFolder(folder: IFolder): void {
    this.deleteFolder.emit(folder);
  }
}
