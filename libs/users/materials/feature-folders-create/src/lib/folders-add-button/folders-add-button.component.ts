import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateMaterialDialogComponent } from '../folder-add-dialog/folder-add-dialog.component';
// import { UsersFacade } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateUserDTO } from '@users/core/data-access';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private name!: string;
  public dialog = inject(MatDialog);
  // private readonly usersFacade = inject(UsersFacade);
  private readonly destroyRef = inject(DestroyRef);
  
  openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<CreateMaterialDialogComponent> = this.dialog.open(CreateMaterialDialogComponent, {
      data: { name: this.name },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: any) => {
        if (result) {
          const newUserData: CreateUserDTO = {
            name: result.name,
            purchaseDate: new Date().toString(),
          };
          // this.usersFacade.addUser(newUserData);
        }
      });
  }
}
