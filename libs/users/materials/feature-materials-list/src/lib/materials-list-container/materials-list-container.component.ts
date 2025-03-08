import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LanguageSwitchService } from '../../../../../core/ui/language-switch/src';
import { Router } from '@angular/router';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListContainerStore } from './materials-list-container.store';
import { MaterialsAddButtonComponent } from '../../../../featute-materials-create/src/lib/materials-add-button/materials-add-button.component';
import { MaterialsDTO } from '../../../../../../core/data-access/src/lib/materials-dto.model';

@Component({
  selector: 'lib-materials-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, MaterialsListComponent, MaterialsAddButtonComponent],
  providers: [MaterialsListContainerStore],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);

  private readonly componentStore = inject(MaterialsListContainerStore);
  private readonly langService = inject(LanguageSwitchService);
  public readonly materials$ = this.componentStore.filteredMaterials$;
  public readonly lang$ = this.langService.selectedLanguage$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  private readonly router = inject(Router);


  onCloseMaterials() {
    this.router.navigate(['/materials'])
  }

  onDeleteMaterial(material: MaterialsDTO) {
    this.componentStore.deleteMaterial(material);
  }
}
