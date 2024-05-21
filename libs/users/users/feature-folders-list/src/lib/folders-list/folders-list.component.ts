import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { CustomDatePipe, FolderType } from '@users/settings/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, CustomDatePipe, MatIconModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
})
export class FoldersListComponent {

  constructor(private router: Router) { }

  folders: FolderType[] = [
    { id: 766, created_at: 1714306475981, title: 'Кайрат' },
    { id: 776, created_at: 1714828591050, title: 'qqwwee' },
    { id: 795, created_at: 1715512066783, title: 'Ha1TamikFolder' }
  ]

  folder!: FolderType
  redact = false

  some!: string


  goToFolder(folderId: number) {
    console.log(folderId);
    this.router.navigate(['materials/' + folderId])
  }

  removeFolder(folderId: number) {
    console.log(folderId);
    // this.store.dispatch(deleteFolder({ id: folderId }))
  }

}
