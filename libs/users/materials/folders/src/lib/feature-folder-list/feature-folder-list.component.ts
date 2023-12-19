import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCardComponent } from '../folder-card/folder-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  IFolder,
  IFolderTitle,
} from '../../../../data-access/src/lib/models/ifolder';
import { FolderService } from '../../../../data-access/src/lib/services/folder-service/folder-service.service';
import { Observable, Subscription } from 'rxjs';
import { Router, RouterModule, NavigationExtras } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'users-feature-folder-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './feature-folder-list.component.html',
  styleUrls: ['./feature-folder-list.component.scss'],
})
export class FeatureFolderListComponent implements OnDestroy {
  private subscriptions = new Subscription();
  private refreshFoldersList() {
    this.folders$ = this.folderService.getFolders();
    this.changeDetectorRef.detectChanges();
  }
  constructor(
    private folderService: FolderService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    (this.subscriptions = new Subscription()),
      console.log('storage in parent', sessionStorage.getItem('folderId'));
  }

  public folders$: Observable<IFolder[]> = this.folderService.getFolders();

  public openFolder(folderId: number) {
    this.router.navigate(['/materials-list'], { state: { data: folderId } });
    console.log(folderId);
  }

  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(FolderCardComponent, dialogConfig);

    const dialogRefSubscription = dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (!result) return;
        this.postData(result);
        console.log('The dialog was closed');
      });
    this.subscriptions.add(dialogRefSubscription);
  }
  postData(data: IFolderTitle) {
    const postSubscription = this.folderService
      .postFolder(data)
      .subscribe((data) => {
        console.log(data);
        this.refreshFoldersList();
      });
    this.subscriptions.add(postSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
