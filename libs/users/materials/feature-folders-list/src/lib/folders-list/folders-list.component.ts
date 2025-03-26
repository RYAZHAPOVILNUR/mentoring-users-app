import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersFacade } from '@users/materials/data-access';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { ActivatedRoute } from '@angular/router';
import { FolderModel } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
})
export class FoldersListComponent implements OnInit {
  @Input({ required: true }) folders: FolderModel[] | null = [];
  @Input({ required: true }) loading?: boolean | string;

  private readonly facade = inject(FoldersFacade);
  private readonly route = inject(ActivatedRoute);
  folders$ = this.facade.folders$;
  loading$ = this.facade.isLoading$;

  ngOnInit(): void {
    this.facade.loadAllFolders();
  }
}
