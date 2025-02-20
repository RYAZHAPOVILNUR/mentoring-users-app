import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersVM } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ShortTitle } from 'libs/users/materials/pipes/short-title.pipe';
import { CorrectDatePipe } from 'libs/users/materials/pipes/correct-date.pipe';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, ShortTitle, CorrectDatePipe],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  private readonly router = inject(Router);

  @Input({ required: true })
  folder!: FoldersVM;

  @Output()
  redirectToFolder = new EventEmitter();

  onOpenFolder(folder: FoldersVM) {
    this.redirectToFolder.emit(folder);
  }
}
