import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import {
  TMaterialDTO,
  MaterialsFacade,
  TCreateMaterialDTO,
  TMaterialListVM,
  FoldersFacade,
} from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';

// import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';

@Component({
  selector: 'materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, AsyncPipe, MaterialsAddButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef$ = inject(DestroyRef);
  private readonly MaterialsFacade = inject(MaterialsFacade);
  private readonly MaterialsFoldersFacade = inject(FoldersFacade);

  public readonly status$ = this.MaterialsFacade.status$;
  public readonly materials$ = this.MaterialsFacade.materials$;
  public readonly errors$ = this.MaterialsFacade.errors$;

  private readonly folders$ = this.MaterialsFoldersFacade.folders$;
  private readonly folderSubject$ = new BehaviorSubject<TMaterialListVM['folder']>({ title: 'folder title' });
  public readonly folder$: Observable<TMaterialListVM['folder']> = this.folderSubject$.asObservable();

  ngOnInit(): void {
    this.MaterialsFacade.init();

    combineLatest([this.route.paramMap, this.folders$]).pipe(
      map(([params, folders]) => {
        this.folderSubject$.next({
          title: folders.find((folder) => Number(params.get('id')) === folder.id)?.title,
        });
      })
    );
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
      .pipe(
        tap((result: boolean) => {
          if (result) {
            this.MaterialsFacade.deleteMaterial(material.id);
          }
        })
      )
      .subscribe();
  }

  public onAddMaterial(material: TCreateMaterialDTO): void {
    this.folder$
      .pipe(
        tap((folder: TMaterialListVM['folder']) => {
          this.MaterialsFacade.addMaterial({
            ...material,
            material_link: material.material_link,
            folder_id: folder.id ?? Date.now(),
          });
        }),
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe();
  }

  public onRedirectToMaterialContent(id: number): void {
    console.log('rediret to material: ' + id);
  }
}
