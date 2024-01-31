import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderEntity } from '../../data-access/src/lib/models/folders.entity';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FolderDeleteDialogComponent } from '../folder-delete-dialog/folder-delete-dialog.component';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { LoadingStatus } from '@users/core/data-access';

@Component({
  selector: 'users-folder-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss'],
})
export class FolderCardComponent {
  router = inject(ActivatedRoute);
  @Input({required: true}) folder!: FolderEntity;
  @Output() deleteFolderEvent = new EventEmitter<FolderEntity>();
  dialog = inject(MatDialog);
  @Input({required: true}) status!: LoadingStatus;

  openDialog(event: MouseEvent) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(FolderDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      result? this.onDeleteFolder(): '';
    });
  }

  onDeleteFolder(){
    this.deleteFolderEvent.emit(this.folder);
  }
}
