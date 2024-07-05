import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { FoldersListComponent } from '@users/materials/feature-folders-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, FoldersListComponent, MatProgressBarModule],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly materialsStatus$ = this.materialsFacade.materialsStatus$;
  public readonly materials$ = this.materialsFacade.materials$;
  public readonly openedFolder$ = this.materialsFacade.openedFolder$;
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public onDeleteFolder(folder: Folder) {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: {dialogText: `Вы уверены, что хотите удалить ${folder.title}`}
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if(result) this.materialsFacade.deleteMaterial(folder.id)
      })
  }

  public onBackToFolders() {
    this.router.navigate(['/materials']);
  }
}
