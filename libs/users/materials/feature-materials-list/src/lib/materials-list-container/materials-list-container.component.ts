import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialsListComponent } from "../materials-list/materials-list.component";
import { FoldersFacade, MaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, MaterialsAddButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit, OnDestroy {
  private readonly foldersFacade = inject(FoldersFacade);
  public readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  public readonly materials$ = this.materialsFacade.allMaterials$;
  public readonly status$ = this.materialsFacade.status$;
  public readonly errors$ = this.materialsFacade.errors$;
  public readonly openedFolder$ = this.foldersFacade.openedFolder$;

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const folderId = Number(params['id']);
      
      if (!isNaN(folderId) && folderId > 0) {
        this.foldersFacade.openedFolder(folderId);
      } else {
        console.error('Invalid folder ID:', params['id']);
      }
    });

    this.materialsFacade.loadMaterials();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public backOnFolders(): void {
    this.router.navigate(['/materials']);
  }

  public onDeleteMaterial(material: MaterialDTO): void {
    this.materialsFacade.deleteMaterial(material.id);
  }
}