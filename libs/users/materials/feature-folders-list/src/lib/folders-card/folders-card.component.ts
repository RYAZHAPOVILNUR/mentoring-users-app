import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Folder } from '@users/materials/data-access';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardComponent {
  @Input({ required: true }) folder!: Folder;
  @Output() deleteFolder = new EventEmitter();
  @Output() redirectTo = new EventEmitter()

  onDeleteFolder(){
    this.deleteFolder.emit();
  }

  onRedirectTo(){
    this.redirectTo.emit();
  }
}
