import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCardComponent } from '../folder-card/folder-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IFolder } from '../../../../data-access/src/lib/models/ifolder';
import { FolderService } from '../../../../data-access/src/lib/services/folder-service/folder-service.service';
import { Observable, Subscription, delay } from 'rxjs';

@Component({
  selector: 'users-feature-folder-list',
  standalone: true,
  imports: [CommonModule, FolderCardComponent, MatButtonModule, MatCardModule],
  templateUrl: './feature-folder-list.component.html',
  styleUrls: ['./feature-folder-list.component.scss'],
})
export class FeatureFolderListComponent implements OnInit {
  constructor(private folderService: FolderService) {}

  // public folders: IFolder[] = [];
  // private folderSubscription: Subscription = new Subscription();
  public folders$!: Observable<IFolder[]>;

  ngOnInit() {
    this.folders$ = this.folderService.getFolders();

    // this.folderSubscription = this.folderService
    //   .getFolders()

    //   .subscribe((data) => {
    //     this.folders = data;
    //     console.log(this.folders);
    //   });
  }

  // ngOnDestroy() {
  //   if (this.folderSubscription) {
  //     this.folderSubscription.unsubscribe();
  //   }
  // }
}
