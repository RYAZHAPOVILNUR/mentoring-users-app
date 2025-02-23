import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { TMaterialDTO } from '@users/materials/data-access';

@Component({
  selector: 'materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, AsyncPipe, DatePipe],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true })
  material!: TMaterialDTO;

  @Output() deleteMaterial = new EventEmitter();

  @Output() redirectToMaterialContent = new EventEmitter();

  private readonly isIconVisibleSubject$ = new BehaviorSubject<boolean>(false);
  public readonly isIconVisible$ = this.isIconVisibleSubject$.asObservable();

  public onShowIcon(isVisible: boolean): void {
    this.isIconVisibleSubject$.next(isVisible);
  }

  public getFileIcon(): string {
    switch (true) {
      case this.material.material_link.endsWith('.pdf'):
        return 'picture_as_pdf';
      case this.material.material_link.endsWith('.mp3'):
        return 'audiotrack';
      case this.material.material_link.includes('youtube.com'):
        return 'ondemand_video';
      default:
        return 'insert_drive_file';
    }
  }

  public onDeleteMaterial(): void {
    this.deleteMaterial.emit();
  }

  public onRedirectToMaterialContent(): void {
    this.redirectToMaterialContent.emit(this.material.id);
  }
}
