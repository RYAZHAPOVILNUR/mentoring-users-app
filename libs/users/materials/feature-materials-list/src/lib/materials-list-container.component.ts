import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { FoldersListUiComponent } from '@users/materials/feature-folders-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialCreate, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListUiComponent } from './components/materials-list-ui/materials-list-ui.component';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AddMaterialDialogUiComponent } from './components/add-material-dialog-ui/add-material-dialog-ui.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    LetDirective,
    FoldersListUiComponent,
    MatButtonModule,
    MatIconModule,
    MaterialsListUiComponent,
    MatMenuModule
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent {
  readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly folderTitle?: string = this.route.snapshot.queryParams['title']; // todo type

  constructor() {
    this.materialsFacade.loadMaterials();
    this.openMaterialHandler();
  }

  private openMaterialHandler(): void {
    this.materialsFacade.openMaterialHandler$.pipe(
      tap((id) => console.log(id))
    ).subscribe();
  }

  onAddButtonClick(): void {
    const dialogRef = this.dialog
      .open<AddMaterialDialogUiComponent, never, MaterialCreate>(
        AddMaterialDialogUiComponent
      );

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      tap((material) => this.materialsFacade.createMaterial(material)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  onBackButtonClick() {
    this.router.navigateByUrl('/folders');
  }
}

