import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'users-material-folder-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './material-folder-item.component.html',
  styleUrls: ['./material-folder-item.component.scss'],
})
export class MaterialFolderItemComponent {
  @Input({ required: true }) title!:string;
  @Input({ required: true }) date!:number;


  onSuchThing() {
    console.log('');
  }
}
