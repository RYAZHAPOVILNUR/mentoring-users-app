import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersAddButtonComponent, FoldersRemoveDialogComponent } from '@users/materials/feature-folders-create';
import { Observable } from 'rxjs';
import { MaterialsFacade } from '@users/materials/data-access';
import { Folder } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';

@Component({
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, FoldersAddButtonComponent, LetDirective, MatProgressBarModule, MatCardModule, MatTooltipModule, MaterialsAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  providers: [MaterialsFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private materialsFacade: MaterialsFacade = inject(MaterialsFacade);
  private dialog: MatDialog = inject(MatDialog);
  private destroyRef: DestroyRef = inject(DestroyRef);
  public loadingStatus$: Observable<string> = this.materialsFacade.loadingStatus$;
  public folders$: Observable<Folder[]> = this.materialsFacade.folders$;

  ngOnInit(): void {
    this.materialsFacade.loadFolders();
  }
  public createNewFolder(title: string): void {
    this.materialsFacade.createFolder(title);
  }
  public removeFolder(eventData: { folderId: number, folderTitle: string }): void {
    const dialogRef: MatDialogRef<FoldersRemoveDialogComponent> = this.dialog.open(FoldersRemoveDialogComponent, {
      data: eventData
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: { delete: boolean }): void => {
        if (res) {
          if (res.delete) this.materialsFacade.removeFolder(eventData.folderId);
        }
      });
  }
  public openFolder(id: number): void {
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  }
}
