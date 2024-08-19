import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersFacade } from '@users/materials/data-access';
import { DeepReadonly } from '@users/core/utils';
import { FoldersEntity } from '@users/materials/data-access';
import { FoldersCardComponent } from "../folders-card/folders-card.component";

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FoldersListComponent {
  @Input({ required: true }) vm!: FoldersListVM;
}

export type FoldersListVM = DeepReadonly<{
  folders: FoldersVM[];
}>;

export type FoldersVM = DeepReadonly<FoldersEntity>;