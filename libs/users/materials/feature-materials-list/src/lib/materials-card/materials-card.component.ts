import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsVM } from '../../../../materials-vm';
import { MatMenuModule } from '@angular/material/menu';
import { TruncatePipe } from '@users/core/utils';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormatIconPipe } from '@users/core/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'materials-card',
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
    FormatIconPipe,
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true })
  public material!: MaterialsVM;

  @Output() deleteMaterial = new EventEmitter<{ materialId: number; materialTitle: string }>();
  @Output() editMaterial = new EventEmitter();
  @Output() openMaterial = new EventEmitter();

  public onDeleteMaterial(dataForDeleteMaterial: { materialId: number; materialTitle: string }) {
    this.deleteMaterial.emit(dataForDeleteMaterial);
  }

  public onEditMaterial(material: MaterialsVM) {
    this.editMaterial.emit(material);
  }

  public onOpenMaterial(material: MaterialsVM) {
    this.openMaterial.emit(material);
  }
}
