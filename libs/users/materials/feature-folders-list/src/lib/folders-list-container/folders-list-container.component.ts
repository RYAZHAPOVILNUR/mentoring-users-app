import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { CreateUsersButtonComponent } from '@users/feature-users-create';
import { LetDirective } from '@ngrx/component';
import { FoldersFacade, TCreateFolderDTO, TFolderVM } from '@users/materials/data-access';
// import { DateLocalizationService } from '../../../../../core/ui/language-switch/src/lib/date-localization.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { Router } from '@angular/router';
import { ProvideDataService } from '@users/materials/data-access';

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
  public readonly status$ = this.MaterialsFoldersFacade.status$;
  public readonly folders$ = this.MaterialsFoldersFacade.folders$;
  public readonly errors$ = this.MaterialsFoldersFacade.errors$;
  // private readonly dateLocalizationService = inject(DateLocalizationService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private destroyRef$ = inject(DestroyRef);
  private readonly provideData = inject(ProvideDataService);

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
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe((result: boolean) => {
        if (result) {
          this.MaterialsFoldersFacade.deleteFolder(folder.id);
        }
      });
  }

  public onAddFolder(folder: TCreateFolderDTO): void {
    this.MaterialsFoldersFacade.addFolder(folder);
  }

  public onRedirectToFolderPage(folderDate: { folderId: number; folderTitle: string }): void {
    this.provideData.updateDate(folderDate.folderTitle);
    console.log(folderDate.folderTitle);
    this.router.navigate(['/materials', folderDate.folderId]);
  }
}
