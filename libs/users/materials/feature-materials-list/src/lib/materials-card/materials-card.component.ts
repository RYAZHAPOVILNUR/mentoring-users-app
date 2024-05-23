import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Material } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/feature-materials-content';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
})
export class MaterialsCardComponent {
  private readonly dialogAdd = inject(MatDialog)
  @Input({required: true})mat!: Material;
  @Output() deleteMaterial: EventEmitter<number> = new EventEmitter();

  public getType(val: string){
    return this.mat.material_link.includes(val)
  }

  public onClick(){    
    this.dialogAdd.open(MaterialsContentComponent, {
      width: '80%',
      height: '80%',
      data: {
        title: this.mat.title,
        material_link: this.mat.material_link
      }
    })
  }

  public onDelete(){
    this.deleteMaterial.emit(this.mat.id)
  }
}