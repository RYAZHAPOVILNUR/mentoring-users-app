import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsEntity } from '../../data-access/src/lib/models/materials.entity';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {  NgxAudioPlayerModule  }  from  'ngx-audio-player' ;
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Track } from 'ngx-audio-player';
import { MaterialType } from '@users/materials/data-access';
import { TypeMaterialsPipe } from '../../type-materials.pipe';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    PdfViewerModule,
    NgxAudioPlayerModule,
    MatInputModule,
    MatButtonModule,
    TypeMaterialsPipe
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
})
export class MaterialsContentComponent {
  linkMaterial = this.data.material.material_link;
  typeMaterial: MaterialType = 'audio';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {material: MaterialsEntity}){}

  mssapPlaylist: Track[] = [{
      title: this.data.material.title,
      link: this.linkMaterial,
      artist: 'Audio Artist',
  }];

  public getVideoId(): string | null {
    const youtubeRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
    const match = this.linkMaterial.match(youtubeRegex);
    return match ? match[1] || match[2] : null;
  }
}
