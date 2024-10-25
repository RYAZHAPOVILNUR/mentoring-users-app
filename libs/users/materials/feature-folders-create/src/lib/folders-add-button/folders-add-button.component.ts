import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateFolderDTO } from '@users/materials/data-access';
import { FoldersFacade } from '@users/materials/data-access';
import { Observable } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { StickyButtonService } from '@users/core/ui';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, PushPipe],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersAddButtonComponent {
  private name: string[] = [];
  public isSticky$: Observable<boolean> = inject(StickyButtonService).isSticky$;
  public readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly foldersFacade = inject(FoldersFacade);

  public openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent, {
      width: '500px',
      data: { name: this.name }
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          const newFolder: CreateFolderDTO = {
            title: result.title
          };
          this.foldersFacade.addFolder(newFolder);
        }
      });
  }
}
