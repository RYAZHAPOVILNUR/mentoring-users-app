import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialsContentComponent } from '@users/feature-materials-content';
import { IMaterial } from 'libs/users/materials/data-access/src/lib/models/materials.model';
import { MaterialsService } from 'libs/users/materials/data-access/src/lib/services/materials.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, TranslateModule, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true })
  material!: IMaterial;

  @Output()
  deleteMaterial = new EventEmitter();

  private readonly dialog = inject(MatDialog);
  public readonly materialsService = inject(MaterialsService);
  private readonly destroyRef = inject(DestroyRef);
  public materialType: string = '';
  public translatedDate$!: Observable<string>;

  ngOnInit() {
    this.materialType = this.materialsService.getMaterialType(this.material.material_link);
    this.translatedDate$ = this.materialsService.translateDate(this.material.created_at);
  }

  onDeleteMaterial(event: Event) {
    event.stopPropagation();
    this.deleteMaterial.emit();
  }

  public openMaterialContentDialog() {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: this.material,
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
