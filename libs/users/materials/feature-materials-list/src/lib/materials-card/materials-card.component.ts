import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMaterialVM } from '../../materialVM';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true}) material!: IMaterialVM;
  @Output() deleteMaterial = new EventEmitter();

  public onDeleteMaterial(id:number) {
    this.deleteMaterial.emit(id);
  }
  public date(time: string){
    return new Date(time).toLocaleDateString();
  }
}
