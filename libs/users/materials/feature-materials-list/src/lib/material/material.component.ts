import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from '@users/materials-data-access';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialTypeIconPipe } from '../pipes/material-type-icon-pipe';
import { MaterialStateService } from '../../../../services/material-state.service';

@Component({
  selector: 'users-material',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTooltipModule, MaterialTypeIconPipe],
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialComponent implements OnInit {
  @Input({ required: true }) public material!: Material;
  private readonly _materialStateService: MaterialStateService = inject(MaterialStateService);

  public getTitleTooltip(title: string): string {
    return title.length > 14 ? title : '';
  }

  public deleteMaterial() {
    this._materialStateService.updateDeleteMaterial({ id: this.material.id, title: this.material.title });
  }

  ngOnInit(): void {
    console.log('material', this.material);
  }
}
