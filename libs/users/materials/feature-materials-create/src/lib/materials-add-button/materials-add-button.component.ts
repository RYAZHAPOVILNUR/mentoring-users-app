import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
    // private name!: string;
    // private email!: string;
    // public dialog = inject(MatDialog);
    // // private readonly usersFacade = inject(UsersFacade);
    // private readonly destroyRef = inject(DestroyRef);
  
    // openAddMaterialDialog(): void {
    //   const dialogRef: MatDialogRef<CreateMaterialDialogComponent> = this.dialog.open(CreateMaterialDialogComponent, {
    //     data: { name: this.name, email: this.email },
    //   });
    //   dialogRef
    //     .afterClosed()
    //     .pipe(takeUntilDestroyed(this.destroyRef))
    //     .subscribe((result) => {
    //       if (result) {
    //         const newUserData: CreateUserDTO = {
    //           name: result.name,
    //           email: result.email,
    //           purchaseDate: new Date().toString(),
    //           educationStatus: 'trainee',
    //         };
  
    //         this.usersFacade.addUser(newUserData);
    //       }
    //     });
    // }
}
