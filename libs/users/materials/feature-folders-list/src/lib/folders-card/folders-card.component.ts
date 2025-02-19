import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FoldersVM } from '@users/materials/folders-vm';
import { MatMenuModule } from '@angular/material/menu';
import { TruncatePipe } from '@users/core/utils';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    TruncatePipe,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  public folder!: FoldersVM;

  @Output() deleteFolder = new EventEmitter<{ folderId: number; folderTitle: string }>();
  @Output() editFolder = new EventEmitter();
  @Output() inMaterial = new EventEmitter<{ folderId: number; folderTitle: string }>();

  public onDeleteFolder(dataForDeleteFolder: { folderId: number; folderTitle: string }) {
    this.deleteFolder.emit(dataForDeleteFolder);
  }

  public onEditFolder(folder: FoldersVM) {
    this.editFolder.emit(folder);
  }

  public onInMaterial(dataForInMaterial: { folderId: number; folderTitle: string }) {
    this.inMaterial.emit(dataForInMaterial);
  }
}
