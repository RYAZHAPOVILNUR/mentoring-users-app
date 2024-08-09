import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddFolder, MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'folders-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private name!: string;
  public dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(MaterialsFacade)


  openAddUserDialog(){
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(
      FoldersAddDialogComponent, {
        data: {name: ''}
      }
    );
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if(result) {
          console.log('result in button comp', result);
          const newFolderData: AddFolder = {
            title: result.title,
          };
          this.materialsFacade.addNewFolder(newFolderData)
        }
      })
  }
}
