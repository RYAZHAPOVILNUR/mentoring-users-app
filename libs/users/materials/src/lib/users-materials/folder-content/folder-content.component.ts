import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IFolder } from '@users/materials/data-access';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-folder-content',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.scss']
})
export class FolderContentComponent {
  @Input() folder!: IFolder;
  @Output() readonly backClick = new EventEmitter<void>();
  private readonly materialsFacade = inject(MaterialsFacade);

  onBack(): void {
    this.backClick.emit();
  }
} 