import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FolderDTO } from '@users/materials/data-access'
import { FeatureFoldersListComponent } from '../folders-list/folders-list.component';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FeatureFoldersListComponent,
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  private readonly matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) folder!: FolderDTO;

  @Output() deleteFolder = new EventEmitter<number>();
  @Output() openFolder = new EventEmitter<number>();

  onDeleteFolder(): void {
    this.deleteFolder.emit(this.folder.id)
  }
  onOpenFolder(): void {
    this.openFolder.emit(this.folder.id);
  }

  // openDialog(id: number): void {

  // }
}
