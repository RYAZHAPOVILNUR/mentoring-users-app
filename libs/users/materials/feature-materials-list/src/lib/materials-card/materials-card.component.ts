import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsContentComponent } from '@users/feature-materials-content';
import { MaterialsEntity } from '@users/materials/data-access';
import { LanguageSwitchService } from '@users/users/core/ui/language-switch';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  private readonly languageSwitchService = inject(LanguageSwitchService);
  private readonly dialog = inject(MatDialog);
  locale$ = this.languageSwitchService.selectedLanguage$;

  @Output() deleteMaterial = new EventEmitter();

  @Input({ required: true })
  material!: MaterialsEntity;

  public formatDate(timestamp: number): Observable<string> {
    return this.locale$.pipe(map((locale) => new Date(timestamp).toLocaleDateString(locale)));
  }

  public get type(): string {
    if (!this.material || !this.material.material_link) {
      return 'unknown';
    }

    const url = this.material.material_link.toLowerCase();

    if (url.endsWith('.mp3')) return 'audio';
    if (url.endsWith('.pdf')) return 'pdf';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'video';

    return 'unknown';
  }

  public onDeleteMaterial(event: Event) {
    event.stopPropagation();
    this.deleteMaterial.emit();
  }

  onOpenMaterialContent() {
    this.dialog.open(MaterialsContentComponent, { data: { ...this.material, type: this.type } });
  }
}
