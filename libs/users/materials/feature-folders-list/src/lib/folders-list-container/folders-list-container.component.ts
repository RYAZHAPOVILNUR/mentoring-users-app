import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { CreateUsersButtonComponent } from '@users/feature-users-create';
import { LetDirective } from '@ngrx/component';
import { UsersListComponent } from '@users/feature-users-list';
import { MaterialsFacade, TCreateFoldersDTO, TFoldersVM } from '@users/materials/data-access';
// import { DateLocalizationService } from '../../../../../core/ui/language-switch/src/lib/date-localization.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';

console.log('сменить зависимости на алиасы');

@Component({
  selector: 'materials-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    CreateUsersButtonComponent,
    LetDirective,
    UsersListComponent,
    AsyncPipe,
    FoldersAddButtonComponent,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly MaterialsFacade = inject(MaterialsFacade);
  public readonly status$ = this.MaterialsFacade.status$;
  public readonly folders$ = this.MaterialsFacade.folders$;
  public readonly errors$ = this.MaterialsFacade.errors$;
  // private readonly dateLocalizationService = inject(DateLocalizationService);
  private readonly dialog = inject(MatDialog);
  private destroyRef$ = inject(DestroyRef);

  constructor() {
    this.MaterialsFacade.init();

    // window.addEventListener('storage', (event) => {
    //   if (event.key === 'lang') {
    //     this.dateLocalizationService.getDateLocalization(localStorage.getItem('lang'), this.folders$);
    //   }
    // });
  }

  public onDeleteFolder(folder: TFoldersVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку ${folder.title} ?` },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe((result) => {
        if (result) {
          this.MaterialsFacade.deleteFolder(folder.id);
        }
      });
  }

  public onAddFolder(folder: TCreateFoldersDTO): void {
    this.MaterialsFacade.addFolder(folder);
  }
}
