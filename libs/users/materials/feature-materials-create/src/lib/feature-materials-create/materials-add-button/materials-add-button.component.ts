import { ChangeDetectionStrategy, Component, inject, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MaterialsFacade } from '@users/materials/data-access';

interface MaterialType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  @Input() folderId: number | null = null;

  @ViewChild('materialSelect') materialSelect!: MatSelect;

  readonly dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);

  materialType: MaterialType[] = [
    { value: 'pdf', viewValue: 'PDF' },
    { value: 'video', viewValue: 'Video' },
    { value: 'audio', viewValue: 'Audio' }
  ];
  selectedMaterialType: string | null = null;

  openSelect(): void {
    if (this.materialSelect) {
      this.materialSelect.open();
    }
  }

  openMaterialAddDialog(value: string): void {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      data: { 
        folderId: this.folderId ?? 0,
        materialType: value
      }
    });

    dialogRef.afterClosed().subscribe(material => {
      if (material) {
        this.materialsFacade.createMaterial(material);
      }
    });
  }

  onMaterialTypeSelected(value: string | null): void {
    this.selectedMaterialType = value;
    this.materialSelect.close();
    if (value) {
      this.openMaterialAddDialog(value);
    }
  }
}