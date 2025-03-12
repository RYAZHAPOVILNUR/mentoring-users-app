import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderDTO } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
    @Input({ required: true })
    folder!: FolderDTO;

    @Output() deleteFolder = new EventEmitter();
    @Output() redirectToMaterials = new EventEmitter();
    
    onDeleteFolder(event: Event) {
      this.deleteFolder.emit();
    }
  
    redirectToMaterialPage() {
      this.redirectToMaterials.emit(this.folder.id);
    }
  
}
