import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Router } from '@angular/router';
import { MaterialsFacade } from '@materials/data-access';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);

  public materials$ = this.materialsFacade.selectMaterialsInFolder$
  public status$ = this.materialsFacade.selectStatus$
  public errors$ = this.materialsFacade.selectErrors$

  public closeFolder() {
    this.router.navigate(['/materials']);
  }
}
