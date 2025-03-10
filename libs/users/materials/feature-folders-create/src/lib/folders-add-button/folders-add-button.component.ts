import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '@users/materials/feature-folders-create';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateFolderDTO } from '@users/core/data-access';
import { FoldersFacade } from '@users/materials/data-access';


@Component({
  selector: 'folders-add-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private name!: string;
  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly folderFacade = inject(FoldersFacade)

  openAddFolderDialog() {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent, {
      data: { name: this.name },
    });
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if(result) {
          console.log(result)
          const newFolder: CreateFolderDTO = {
            title: result,
            created_at: Date.now().toString(),
          }
          this.folderFacade.addFolder(newFolder);
        }
      })
  }

}
