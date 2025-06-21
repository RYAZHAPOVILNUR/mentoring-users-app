import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddFoldersFeatureComponent } from '../add-folders-feature/add-folders-feature.component';
import { Folder } from '@users/materials/data-access';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-materials-folders-feature',
  imports: [CommonModule, DatePipe, NgFor, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-folders-feature.component.html',
  styleUrl: './materials-folders-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MaterialsFoldersFeatureComponent {
  @Input() folders!: Folder[];
  @Output() addFolder = new EventEmitter<string>();
  @Output() deleteFolder = new EventEmitter<number>();
  @Output() setOpenedFolder = new EventEmitter<number>();
  private matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  deletedFolder(id: number) {
    this.deleteFolder.emit(id);
  }
  openedFolder(folderId: number) {
    this.setOpenedFolder.emit(folderId);
  }
  public openChangeTaskModal(): void {
    const dialogRef: MatDialogRef<AddFoldersFeatureComponent> = this.matDialog.open(AddFoldersFeatureComponent, {});
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((folderName) => !!folderName),
      )
      .subscribe((folderName) => this.addFolder.emit(folderName));
  }
}
