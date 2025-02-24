import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { FoldersFacade } from '@users/materials/data-access';

@Component({
  selector: 'folders-card',
  standalone: true,
  imports: [CommonModule,FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent implements OnInit {
  private readonly foldersFacade = inject(FoldersFacade)
  ngOnInit(): void {
    this.foldersFacade.init()
  }

}
