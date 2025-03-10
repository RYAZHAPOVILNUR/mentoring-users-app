import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LanguageSwitchService } from '@users/users/core/ui/language-switch';
import { Router } from '@angular/router';
import { MaterialsListContainerStore } from './materials-list-container.store';
import { MaterialsDTO } from '@users/core/data-access';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';


@Component({
  selector: 'lib-materials-list-container',
  standalone: true,
  imports: [LetDirective, MaterialsListComponent, MaterialsAddButtonComponent],
  providers: [MaterialsListContainerStore],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {

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

