import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule, NgFor, NgIfContext } from '@angular/common';
import { FoldersListVM } from './folders-list-view.module';
import { FoldersFacade, FoldersVM } from '@users/materials/data-access';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { isNgContainer } from '@angular/compiler';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, NgFor, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  private readonly fasade = inject(FoldersFacade);

  @Input({ required: true })
  vm!: FoldersListVM;
  ngOnInit() {
    console.log('List', this.fasade.init());
  }

  constructor() {
    console.log('Folders List>>>', this.vm);
  }
}
