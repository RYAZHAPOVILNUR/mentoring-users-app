import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateFoldersDTO, MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule,],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private readonly materialsFacade = inject(MaterialsFacade);

  private readonly destroyRef = inject(DestroyRef);

  public dialog = inject(MatDialog);

  private folderTitle!: string; 

  
  onAddFolder(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog
      .open(FoldersAddDialogComponent, { data: { folderTitle: this.folderTitle } });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if(result) {
          const newFolder: CreateFoldersDTO = {
            title: result.folderTitle
          }

          this.materialsFacade.addFolder(newFolder)
        }
      })
  }
}
