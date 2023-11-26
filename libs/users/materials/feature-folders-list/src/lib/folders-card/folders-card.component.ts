import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { IFolder } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({required: true})
  folder!: IFolder;

  @Output() deleteFolder = new EventEmitter();

  public onDeleteFolder(folder: IFolder) {
    this.deleteFolder.emit(folder)
  }

  public dateFormat(time: number): string {
    const date = new Date(time);
    return `${date.getDate()} 
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)} 
    ${date.getFullYear()}`
  }
}