import { ChangeDetectionStrategy, Component, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAddFolder, MaterialsFacade } from '@users/materials/data-access';
@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private folderTitle!: string
  public dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef)
  private readonly materialsFacade = inject(MaterialsFacade)

  onAddFolder(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog
      .open(FoldersAddDialogComponent, { data: { folderTitle: this.folderTitle } });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if(result) {
          const newFolder: IAddFolder = {
            title: result.folderTitle
          }

          this.materialsFacade.addFolder(newFolder)
        }
      })
  }
}
