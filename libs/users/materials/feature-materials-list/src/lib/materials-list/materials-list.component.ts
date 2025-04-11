import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { FoldersFacade, IFolder } from '@users/materials/data-access';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { ActivatedRoute } from '@angular/router';
import { MaterialsEntity } from '@users/core/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatButtonModule, MatIconModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  public folderId!: number;
  public folder$!: Observable<IFolder | undefined>;
  public materials$!: Observable<MaterialsEntity[]>;
  public isLoading = true;

  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private foldersFacade = inject(FoldersFacade);
  private location = inject(Location);

  constructor() {
    this.foldersFacade.init();
  }

  goBack() {
    this.location.back();
  }
}
