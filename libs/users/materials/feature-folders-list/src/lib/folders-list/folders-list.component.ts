import { ChangeDetectionStrategy, Component, inject, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { BehaviorSubject, exhaustMap, filter, Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BidiModule } from '@angular/cdk/bidi';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressBarModule, FoldersCardComponent, MatSnackBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  snackBar = inject(MatSnackBar)
  @ViewChild('deletedFolder') deletedFolder!: TemplateRef<any>
  @Input() vm!: any
  title$: BehaviorSubject<string> = new BehaviorSubject<string>('')
}
