import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsVM } from '../../../../vm/materials-vm';
import localeRu from '@angular/common/locales/ru';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';

registerLocaleData(localeRu);

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, DatePipe, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  readonly dialog = inject(MatDialog);

  @Input({ required: true })
  material!: MaterialsVM;

  @Output()
  deleteMaterial = new EventEmitter();

  public openDialog(material: MaterialsVM, materialType: string): void {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: { material, materialType },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  public onDeleteMaterial(event: Event): void {
    event.stopPropagation();
    this.deleteMaterial.emit();
  }

  public getMaterialTypeIcon(link: string): string {
    const mp3 = link.endsWith('.mp3');
    const pdf = link.endsWith('.pdf');
    return mp3 ? 'music_note' : pdf ? 'description' : 'movie';
  }

  public getMaterialType(link: string): string {
    const mp3 = link.endsWith('.mp3');
    const pdf = link.endsWith('.pdf');
    return mp3 ? 'audio' : pdf ? 'pdf' : 'video';
  }
}
