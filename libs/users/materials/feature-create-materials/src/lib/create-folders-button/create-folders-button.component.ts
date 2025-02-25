import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MaterialsFacade } from "@users/materials/data-access";
import { CreateFoldersDialogComponent } from "../create-folders-dialog/create-folders-dialog.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CreateFolderDTO } from "@users/core/data-access";
@Component({
  selector: 'create-folders-button',
  templateUrl: './create-folders-button.component.html',
  styleUrls: ['./create-folders-button.component.scss'],
  standalone: true,
  imports: [MatIconModule,CommonModule, MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCreateButtonComponent {
  private name!: string;
  public dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);

  openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<CreateFoldersDialogComponent> = this.dialog.open(CreateFoldersDialogComponent, {
      data: {name: this.name},
    });
    dialogRef
    .afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((result) => {
      if(result) {
        const newFolderData:CreateFolderDTO = {
          name: result.name,
          createAt: new Date().getDate().toString(),
        };

        this.materialsFacade.addFolder(newFolderData);
      }
    });
  }
}