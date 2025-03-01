import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LineTrimPipe } from '@users/pipes';
import { MaterialsVM } from '../../../../materials-vm';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, LineTrimPipe],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true})
  material!: MaterialsVM;
  @Output()
  delete = new EventEmitter<number>();
  @Output()
  view = new EventEmitter<MaterialsVM>()

  public showDeleteIcon = false;

  public deleteMaterial(event: Event): void {
    event.stopPropagation();
    this.delete.emit()
  }

  public openMaterial() {
    this.view.emit(this.material)
  }

  public getFileTypeIcon(): string {
    const link = this.material.materialLink;

    if (link.includes('.mp4') || link.includes('youtu')) {
      return 'videocam';
    }
    if (link.includes('.mp3')) {
      return 'audiotrack';
    }
    if (link.includes('.pdf')) {
      return 'picture_as_pdf';
    }
    return 'folder';
  }
}
