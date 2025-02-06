import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { TMaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, AsyncPipe, MaterialsAddButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef$ = inject(DestroyRef);

  private readonly MaterialsFacade = inject(MaterialsFacade);
  public readonly status$ = this.MaterialsFacade.status$;
  public readonly materials$ = this.MaterialsFacade.materials$;
  public readonly errors$ = this.MaterialsFacade.errors$;

  public readonly folder$: Observable<{
    folderTitle: string;
    folderId: number;
  }> = combineLatest([this.route.queryParamMap, this.route.paramMap]).pipe(
    map(([queryParams, params]) => ({
      folderTitle: queryParams.get('folder') ?? 'Folder Title',
      folderId: Number(params.get('id')),
    }))
  );

  constructor() {
    this.MaterialsFacade.init();
  }

  public onGoBack(): void {
    this.router.navigate(['/materials']);
  }

  public onDeleteMaterial(material: TMaterialDTO): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку ${material.title} ?` },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe((result: boolean) => {
        if (result) {
          this.MaterialsFacade.deleteMaterial(material.id);
        }
      });
  }

  public onAddMaterial(material: { title: string; materialLink: string }): void {
    this.folder$
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe((folder: { folderTitle: string; folderId: number }) => {
        this.MaterialsFacade.addMaterial({
          ...material,
          material_link: material.materialLink,
          folder_id: folder.folderId,
        });
      });
  }

  public onRedirectToMaterialContent(id: number): void {
    console.log('rediret to material: ' + id);
  }
}
