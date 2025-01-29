import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListComponent } from '../materials-list/materials-list.component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsAddButtonComponent,
    MaterialsListComponent,
    LetDirective,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  public folders$ = this.materialsFacade.folders$;
  private router = inject(Router);

  closeFolder() {
    this.router.navigate(['/materials']);
  }
}
