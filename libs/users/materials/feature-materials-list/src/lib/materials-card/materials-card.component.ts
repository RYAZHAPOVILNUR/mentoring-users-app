import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  LOCALE_ID,
  OnChanges,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMaterial } from '@users/materials/data-access';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';
import { MaterialsCardService } from './materials-card.service';
registerLocaleData(localeRu);

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    NgFor,
    MatIconModule,
    MatDividerModule,
    DatePipe,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent implements OnChanges {
  private dialog = inject(MatDialog);
  public materialLink!: string;
  private materialService = inject(MaterialsCardService);
  @Input({ required: true })
  material!: IMaterial;
  @Output() deleteMaterial = new EventEmitter();

  ngOnChanges() {
    this.materialLink = this.material.material_link;
  }

  onDeleteMaterial(event: Event) {
    event.stopPropagation();
    this.deleteMaterial.emit(this.material);
  }

  openDialog() {
    this.dialog.open(MaterialsContentComponent);
    this.materialService.setMaterial(this.material);
  }
}
