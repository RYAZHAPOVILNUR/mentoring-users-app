import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { CreateUsersButtonComponent } from '@users/feature-users-create';
import { LetDirective } from '@ngrx/component';
import { FoldersFacade, TCreateFolderDTO, TFolderVM } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
// import { DateLocalizationService } from '../../../../../core/ui/language-switch/src/lib/date-localization.service';

@Component({
  selector: 'materials-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    CreateUsersButtonComponent,
    LetDirective,
    AsyncPipe,
    FoldersAddButtonComponent,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly MaterialsFoldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  public readonly status$ = this.MaterialsFoldersFacade.status$;
  public readonly folders$ = this.MaterialsFoldersFacade.folders$;
  public readonly errors$ = this.MaterialsFoldersFacade.errors$;

  // private readonly dateLocalizationService = inject(DateLocalizationService);

  constructor() {
    this.MaterialsFoldersFacade.init();

    // window.addEventListener('storage', (event) => {
    //   if (event.key === 'lang') {
    //     this.dateLocalizationService.getDateLocalization(localStorage.getItem('lang'), this.folders$);
    //   }
    // });
  }

  public onDeleteFolder(folder: TFolderVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку ${folder.title} ?` },
    });
    dialogRef
      .afterClosed()
      .pipe(
        tap((result: boolean) => {
          if (result) {
            this.MaterialsFoldersFacade.deleteFolder(folder.id);
          }
        })
      )
      .subscribe();
  }

  public onAddFolder(folder: TCreateFolderDTO): void {
    this.MaterialsFoldersFacade.addFolder(folder);
  }

  public onRedirectToFolderPage(folder: TFolderVM): void {
    this.router.navigate(['/materials', folder.id]);
  }
}
