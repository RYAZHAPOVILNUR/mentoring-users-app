import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialsFacade } from '../../../../data-access/src/lib/+state/materials/materials.facade';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsAddButtonComponent } from '../../../../feature-materials-create/src/lib/materials-add-button/materials-add-button.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialsContentComponent } from '../../../../feature-materials-content/src/lib/materials-content/materials-content.component';
import { ContentData, Material } from 'libs/users/materials/data-access/src/lib/models/folders.interface';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsCardComponent,
    LetDirective,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MaterialsAddButtonComponent,
    MatDialogModule,
    NgxExtendedPdfViewerModule,
    MaterialsContentComponent,
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  private route = inject(ActivatedRoute);

  public readonly materials$ = this.materialsFacade.allMaterials$;
  public readonly status$ = this.materialsFacade.status$;
  public readonly error$ = this.materialsFacade.error$;
  public folderTitle: string | null = null;
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.route.params.pipe().subscribe((params) => {
      const folderId = +params['id'];
      if (folderId) {
        this.materialsFacade.load(folderId);
      }
    });

    this.folderTitle = this.route.snapshot.queryParamMap.get('folderTitle');
  }

  goBack() {
    this.router.navigate(['materials']);
  }

  onDeleteMaterial(id: number) {
    this.materialsFacade.deleteMaterial(id);
  }

  openMaterial(material: Material) {
    let contentData: ContentData;

    const fileType = this.getFileType(material.material_link);

    switch (fileType) {
      case 'pdf':
        contentData = { type: 'pdf', content: material.material_link, title: material.title };
        break;
      case 'youtube':
        contentData = { type: 'youtube', content: material.material_link, title: material.title };
        break;
      case 'audio':
        contentData = { type: 'audio', content: material.material_link, title: material.title };
        break;
      default:
        contentData = { type: 'unknown', content: '', title: 'Unsupported Content' };
    }

    this.dialog.open(MaterialsContentComponent, {
      data: contentData,
    });
  }

  getFileType(url: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    }

    const extension = url.split('.').pop();
    switch (extension) {
      case 'pdf':
        return 'pdf';
      case 'mp3':
      case 'wav':
        return 'audio';
      default:
        return 'file';
    }
  }
}
