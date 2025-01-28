import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { CreateUsersButtonComponent } from '@users/feature-users-create';
import { LetDirective } from '@ngrx/component';
import { UsersListComponent } from '@users/feature-users-list';
import { MaterialsFacade, TFoldersVM } from '@users/materials/data-access';
import { DateLocalizationService } from '../../../../../core/ui/language-switch/src/lib/date-localization.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { Subject, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnDestroy {
  private readonly MaterialsFacade = inject(MaterialsFacade);
  public readonly status$ = this.MaterialsFacade.status$;
  public readonly folders$ = this.MaterialsFacade.folders$;
  public readonly errors$ = this.MaterialsFacade.errors$;
  private readonly dateLocalizationService = inject(DateLocalizationService);
  private readonly dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

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
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.MaterialsFacade.deleteFolder(folder.id);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
