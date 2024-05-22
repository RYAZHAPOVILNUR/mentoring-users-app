import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe, FolderType } from '@users/settings/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteFolder, getFolderList, loadFolders } from '@users/materials/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    CustomDatePipe,
    MatIconModule
  ],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
})
export class FoldersListComponent implements OnInit {
  folders!: Observable<FolderType[]>;
  folder!: FolderType
  redact = false
  some!: string

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.getFoldersForList()
  }

  getFoldersForList() {
    this.store.dispatch(loadFolders())
    this.folders = this.store.select(getFolderList)
  }

  goToFolder(folderId: number) {
    this.router.navigate(['materials/' + folderId])
  }

  removeFolder(folderId: number) {
    console.log(folderId)
    this.store.dispatch(deleteFolder({ id: folderId }))
  }
}
