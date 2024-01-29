import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Router } from '@angular/router';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly router = inject(Router)
  private readonly materialsFacade = inject(MaterialsFacade)

  goBackToFolders(){
    this.router.navigate(['/materials'])
  }
}
