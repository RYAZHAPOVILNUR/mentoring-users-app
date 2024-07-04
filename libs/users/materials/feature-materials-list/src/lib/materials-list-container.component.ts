import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { FoldersListUiComponent } from '@users/materials/feature-folders-list';
import { MaterialCreate, MaterialEntity, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListUiComponent } from './components/materials-list-ui/materials-list-ui.component';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { AddMaterialDialogUiComponent } from './components/add-material-dialog-ui/add-material-dialog-ui.component';
import { MaterialDialogUiComponent } from './components/open-material-dialog-ui/material-dialog-ui.component';
import { MaterialIconPipe } from './pipes/material-icon.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    FoldersListUiComponent,
    MaterialsListUiComponent,
    LetDirective,
    MatButtonModule
  ],
  providers: [MaterialIconPipe],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent {
  readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);


  constructor() {
    this.loadData();
    this.initHandlers();
  }

  private loadData(): void {
    this.materialsFacade.loadFolders();
    this.materialsFacade.loadMaterials();
  }

  private initHandlers(): void {
    this.initOpenMaterialHandler();
    this.initCreateMaterialHandler();
    this.initDeleteMaterialHandler();
  }

  private initOpenMaterialHandler(): void {
    this.materialsFacade.materialOpen$.pipe(
      switchMap((material) => this.openDialog(material)),
      tap((material) => this.materialsFacade.openMaterial(material)),
      takeUntilDestroyed()
    ).subscribe();
  }

  private openDialog(material: MaterialEntity): Observable<MaterialEntity> {
    const dialogRef = this.dialog
      .open<MaterialDialogUiComponent, MaterialEntity, MaterialEntity>(
        MaterialDialogUiComponent, {
          data: material,
          height: '80vh',
          width: '100vw',
          maxWidth: '100vw',
          maxHeight: '80vh',
          autoFocus: false
        }
      );

    return dialogRef.afterClosed().pipe(filter(Boolean));
  }

  private initDeleteMaterialHandler(): void {
    this.materialsFacade.folderDelete$.pipe(
      tap((id) => this.materialsFacade.deleteMaterial(id)),
      takeUntilDestroyed()
    ).subscribe();
  }

  private initCreateMaterialHandler(): void {
    this.materialsFacade.materialCreateDialogOpen$.pipe(
      switchMap(this.openCreateDialog.bind(this)),
      tap((material) => this.materialsFacade.createMaterial(material)),
      takeUntilDestroyed()
    ).subscribe();
  }

  private openCreateDialog(): Observable<MaterialCreate> {
    const dialogRef = this.dialog
      .open<AddMaterialDialogUiComponent, never, MaterialCreate>(
        AddMaterialDialogUiComponent
      );

    return dialogRef.afterClosed().pipe(filter(Boolean));
  }
}




