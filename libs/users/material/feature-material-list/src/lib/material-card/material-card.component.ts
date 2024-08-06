import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from '@users/material';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-material-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialCardComponent {
  @Input() material!: Material;
  @Output() openMaterial = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();

  public onOpenMaterial(): void {
    this.openMaterial.emit(this.material);
  }

  public onDeleteMaterial(): void {
    this.deleteMaterial.emit(this.material.id);
  }
}
