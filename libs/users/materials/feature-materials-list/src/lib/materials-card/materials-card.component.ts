import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TMaterialDTO } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
})
export class MaterialsCardComponent {
  @Output() deleteMaterial = new EventEmitter<TMaterialDTO>();
  @Output() openMaterial = new EventEmitter<TMaterialDTO>();
  @Input({ required: true })
  public material!: TMaterialDTO;
  public isDisplayItem = false;

  toggleDisplayItem(): void {
    this.isDisplayItem = !this.isDisplayItem
  }
}
