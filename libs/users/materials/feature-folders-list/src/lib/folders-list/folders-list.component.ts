import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MaterialFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';


@Component({
  selector: 'users-feature-folders-list',
  standalone: true,
  imports: [
    CommonModule,
    FoldersCardComponent,
  ],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFoldersListComponent {
  private readonly facade = inject(MaterialFacade)
  public readonly folders$ = this.facade.folders$;
  private readonly router = inject(Router);

  onDeleteFolder(id: number): void {
    this.facade.deleteFolder(id);
  }

  onOpenFolder(id: number): void {
    this.facade.openFolder(id)
    this.router.navigate([`materials/${id}`]);
  }
}
