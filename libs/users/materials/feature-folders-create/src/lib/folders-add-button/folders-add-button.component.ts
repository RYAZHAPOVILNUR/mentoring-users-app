import { ChangeDetectionStrategy, Component, DestroyRef, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddFolder, MaterialsFacade } from '@users/materials/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private snackBar = inject(MatSnackBar);

  @ViewChild('snackbarAddFolderSuccess') snackbarTemplateRef!: TemplateRef<any>;

  private onAddFolderSuccess = () =>
    this.snackBar.openFromTemplate(this.snackbarTemplateRef, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

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
          this.materialsFacade.addNewFolder(newFolderData, this.onAddFolderSuccess)
        }
      })
  }
}
