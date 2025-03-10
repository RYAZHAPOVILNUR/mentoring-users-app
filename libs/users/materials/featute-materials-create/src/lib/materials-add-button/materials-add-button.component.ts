import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateMaterialDTO } from '@users/core/data-access';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'materials-add-button',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
  ],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent implements OnInit, OnDestroy {

  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private router = inject(ActivatedRoute);
  private materialFacade = inject(MaterialsFacade)
  private folderId!: number;
  private folderIdSub!: Subscription;

  ngOnInit(): void {
    this.folderIdSub = this.router.params.subscribe(params => {
      this.folderId = params['id'];
    })
  }

  openDialog(type: string) {
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog.open(MaterialsAddDialogComponent, {
      data: { type: type }
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: {title: string, link: string}) => {
        const newMaterial: CreateMaterialDTO = {
          created_at: Date.now().toString(),
          title: res.title,
          material_link: res.link,
          folder_id: Number(this.folderId)
        };
        this.materialFacade.addMaterial(newMaterial);
      });
  }

  ngOnDestroy(): void {
    this.folderIdSub.unsubscribe();
  }
}
