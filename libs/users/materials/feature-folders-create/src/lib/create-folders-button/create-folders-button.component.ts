import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateFolder, MaterialsFacade } from '@users/users/materials/data-access';
import { CreateFoldersDialogComponent } from '../create-folders-dialog/create-folders-dialog.component';
import { filter } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'users-create-folders-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    MatTooltipModule,
  ],
  templateUrl: './create-folders-button.component.html',
  styleUrls: ['./create-folders-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFoldersButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(MaterialsFacade);

  openAddFolderDialog(): void {
    const dialogRef = this.dialog.open<CreateFoldersDialogComponent, never, CreateFolder>(
      CreateFoldersDialogComponent
    );
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
      )
      .subscribe((folderData) => {
        this.materialsFacade.addFolder(folderData);
      });
  }
}
