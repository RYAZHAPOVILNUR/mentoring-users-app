import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MaterialsFacade } from './../../../../data-access/src/lib/+state/materials.facade';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialsFoldersFeatureComponent } from '../materials-folders-feature/materials-folders-feature.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';


@Component({
  selector: 'lib-folders-feature-container',
  imports: [CommonModule, MaterialsFoldersFeatureComponent, MatProgressBarModule, LetDirective ],
  templateUrl: './folders-feature-container.component.html',
  styleUrl: './folders-feature-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FoldersFeatureContainerComponent {
  public router = inject(Router);
  public materialsFacade = inject(MaterialsFacade);
  public status$ = this.materialsFacade.getStatus$;
  public folders$ = this.materialsFacade.allFolders$;
  public openedFolder$ = this.materialsFacade.openedFolder$;

  ngOnInit() {
    this.materialsFacade.getFolders();
  }
 

  setOpenedFolder(id: number) {
    this.router.navigate(['/materials/', id]);
  }
  onDeleteFolder(id: number) {
    this.materialsFacade.deleteFolder(id);
  }

  onAddFolder(folderName: string) {
    const newFolder = {
      title: folderName,
      material_id: 0,
    };
    this.materialsFacade.addFolder(newFolder);
  }
}
