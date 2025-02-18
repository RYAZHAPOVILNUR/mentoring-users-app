import { ChangeDetectionStrategy, Component, inject, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import { FoldersDeleteDialogComponent } from '../folders-delete-dialog/folders-delete-dialog.component';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FolderDTO } from 'libs/users/materials/data-access/src/lib/models/interfaces';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @ViewChild('deletedFolder') deletedFolder!: TemplateRef<any>
  @Input() folder!: FolderDTO
  facade: MaterialsFacade = inject(MaterialsFacade)
  router = inject(Router)
  dialog: MatDialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  openFolder(id: number) {
    this.router.navigate(['/materials', id])
  }

  openAlert() {
    this.snackBar.openFromTemplate(this.deletedFolder,
      {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "top"
      }
    )
  }

  del(id: number, title: string, event: Event) {
    event.stopPropagation()
    this.dialog.open(FoldersDeleteDialogComponent, {
      data: {
        title
      }
    })
      .afterClosed()
      .subscribe(v => v && this.facade.DeleteFolder({ id, title, created_at: '' }, this.openAlert.bind(this)))
  }
}
