import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Mat } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  public dialogAdd = inject(MatDialog)
  @Input()mat!: Mat;
  @Output() deleteMat = new EventEmitter();

  public type(val: string){
    return this.mat.material_link.includes(val)
  }
  
  get date(){
    const date = new Date(this.mat.created_at);
    return date.toLocaleString('default', {day: "numeric", year: "numeric", month: 'short' })
  }

  public onClick(){
    console.log(this.mat)
    this.dialogAdd.open(MaterialsContentComponent, {
      data: {
        title: this.mat.title,
        material_link: this.mat.material_link
      }
    })
  }

  public onDelete(){
    this.deleteMat.emit(this.mat.id)
  }
}
