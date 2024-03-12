import { ChangeDetectionStrategy, Component, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createdFolder, MaterialsFacade } from '@users/materials/data-access'

@Component({
  selector: 'folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef)
  private readonly materialsFacade = inject(MaterialsFacade)

  public openDialog() {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent);
    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      (folderName) => {
        if (folderName) {
          let newFolder: createdFolder = {
            title: folderName
          }
          this.materialsFacade.createFolder(newFolder)
        }
      }
    )
  }
}
