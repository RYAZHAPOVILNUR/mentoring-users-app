// materials.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-materials',
  templateUrl: './users-materials.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class UsersMaterialsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
}
