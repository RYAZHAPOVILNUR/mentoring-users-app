import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialFacade } from '@users/materials/data-access';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly facade = inject(MaterialFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly title: string | undefined;

  openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent,
      {
        data: { title: this.title },
      });
    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(Boolean),
      tap((title) => this.facade.addFolder({ title }))
    ).subscribe()
  }
}
