import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsFileDialogComponent } from '../materials-file-dialog/materials-file-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsDeleteDialogComponent } from '../materials-delete-dialog/materials-delete-dialog.component';

@Component({
  selector: 'users-materials-detail-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './materials-detail-card.component.html',
  styleUrls: ['./materials-detail-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsDetailCardComponent implements OnInit {
  @Input({ required: true })
  material!: MaterialDTO;
  fileExt!: string;
  activeFileType!: string;
  safeUrl!: SafeResourceUrl;
  @Output() deleteMaterial = new EventEmitter();

  private readonly materialFacade = inject(MaterialsFacade);

  private readonly destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    if (this.material?.material_link) {
      this.fileExt = this.material.material_link.split('.').pop() as string;
    }
  }

  openFile(fileType: string, url: string) {
    this.activeFileType = fileType;

    if (fileType !== 'pdf' && fileType !== 'mp3') {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${fileType}`);
    } else {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    this.openMaterialDialog();
  }

  openMaterialDialog(): void {
    const dialogRef: MatDialogRef<MaterialsFileDialogComponent> = this.dialog.open(MaterialsFileDialogComponent, {
      data: { activeFileType: this.activeFileType, safeUrl: this.safeUrl, link: this.material.material_link },
      width: '600px',
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef));
  }

  openDeleteMaterialDialog(e: Event): void {
    e.stopPropagation();
    const dialogRef: MatDialogRef<MaterialsDeleteDialogComponent> = this.dialog.open(MaterialsDeleteDialogComponent, {
      data: { title: this.material.title, id: this.material.id },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => {
        if (id) {
          this.materialFacade.onDeleteMaterial(id);
        }
      });
  }
}
