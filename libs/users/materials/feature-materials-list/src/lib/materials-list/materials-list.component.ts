import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { Folder, Material } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ContentModel } from '@users/materials/feature-materials-content';

@Component({
  selector: 'materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MatIconModule, MatCardModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true })
  public materials: Material[] = [];
  @Input({ required: true })
  public currentFolderData: Folder | null = null;
  @Output()
  public navigateBackEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public removeMaterialEmit: EventEmitter<{ materialId: number, materialTitle: string }> = new EventEmitter<{materialId: number; materialTitle: string}>();
  @Output()
  public openMaterialEmit: EventEmitter<ContentModel> = new EventEmitter<ContentModel>();

  public navigateBack(): void {
    this.navigateBackEmit.emit(true);
  }

  public playMusic(): void {
    const audio = new Audio();
    audio.src = 'https://file-examples.com/storage/fe34a88a9a65cf545955ccb/2017/11/file_example_MP3_2MG.mp3';
    audio.autoplay;
  }

  public onRemoveMaterial(eventData: { materialId: number, materialTitle: string }): void {
    this.removeMaterialEmit.emit(eventData);
  }

  public onOpenMaterialEmit(eventData: ContentModel): void {
    this.openMaterialEmit.emit(eventData);
  }
}
