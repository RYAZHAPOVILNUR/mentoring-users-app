// materials-list-container.component.ts
import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialsListComponent } from "../materials-list/materials-list.component";
import { FoldersFacade, MaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, MaterialsAddButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  private readonly foldersFacade = inject(FoldersFacade);
  public materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute); // Получаем активный маршрут

  materials$ = this.materialsFacade.allMaterials$;
  status$ = this.materialsFacade.status$;
  errors$ = this.materialsFacade.errors$;
  public readonly openedFolder$ = this.foldersFacade.openedFolder$;

  ngOnInit(): void {
    // Получаем параметр "id" из маршрута
    this.route.params.subscribe(params => {
      const folderId = +params['id']; // Преобразуем в число, если id приходит как строка
      if (folderId) {
        // Диспатчим экшен с полученным id
        this.foldersFacade.openedFolder(folderId);
      }
    });

    this.materialsFacade.loadMaterials();
  }

  public backOnFolders() {
    this.router.navigate(['/materials']);
  }

  onDeleteMaterial(material: MaterialDTO) {
    this.materialsFacade.deleteMaterial(material.id);
  }
}
