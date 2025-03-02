import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MaterialSelectors, MaterialsFacade } from '@users/materials/data-access';
import { filter, map, Observable, take, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MaterialsListComponent, LetDirective, MaterialsAddButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  route = inject(ActivatedRoute)
  store: Store = inject(Store)
  private readonly facade = inject(MaterialsFacade)
  readonly materials$: Observable<any> = this.facade.openedMaterial$
  readonly folders$: Observable<any> = this.store.select(MaterialSelectors.selectFolders)
  readonly status$ = this.store.select(MaterialSelectors.selectStatus)

  constructor() { 
    this.facade.initFiles()
  }

  getFolderName(folders: any[]) {
    const id: string | null = this.route.snapshot.paramMap.get('id')
    return folders.find(v => v.id === +id!)?.title
  }
}
