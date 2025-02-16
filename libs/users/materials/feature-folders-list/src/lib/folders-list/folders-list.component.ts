import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListVM } from './folders-list-view.module';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: FoldersListVM;

  ngOnInit() {
    console.log('Folders List>>>');
  }

  constructor() {}
}
