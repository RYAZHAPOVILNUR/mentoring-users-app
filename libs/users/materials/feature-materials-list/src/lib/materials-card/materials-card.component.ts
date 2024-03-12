import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChangeVisibilityDirective } from '@users/core/utils';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content'

type MaterialFormat = 'video' | 'audio' | 'pdf' | 'incorrect';
@Component({
  selector: 'materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ChangeVisibilityDirective,
    MatDialogModule
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent implements OnInit {
  public materialFormat!: MaterialFormat;
  private dialog = inject(MatDialog)
  @Input({ required: true })
  material!: Material
  @ViewChild("deleteButton", { static: true, read: ElementRef })
  deleteBtn!: ElementRef<HTMLButtonElement>;
  @Output()
  deleteMaterial = new EventEmitter();

  ngOnInit(): void {
    this.defineMaterialFormat()
  }
  public openDialog() {
    this.dialog.open(MaterialsContentComponent, {
      data: {
        title: this.material.title,
        material_link: this.material.material_link,
        material_format: this.materialFormat
      }
    })
  }
  public onDeleteMaterial(event: MouseEvent) {
    event.stopPropagation()
    this.deleteMaterial.emit()
  }
  private defineMaterialFormat() {
    this.materialFormat =
      this.material.material_link.includes('video') ||
        this.material.material_link.includes('youtu') ? 'video' :
        this.material.material_link.includes('audio') ||
          this.material.material_link.includes('mp3') ? 'audio' :
          this.material.material_link.includes('pdf') ? 'pdf' : 'incorrect';
  }
}
