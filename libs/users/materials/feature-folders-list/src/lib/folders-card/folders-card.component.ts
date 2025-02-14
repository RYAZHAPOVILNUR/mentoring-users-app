import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FoldersEntity } from '@users/materials/data-access';
import { LanguageSwitchService } from '@users/users/core/ui/language-switch';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
})
export class FoldersCardComponent {
  private readonly languageSwitchService = inject(LanguageSwitchService);
  locale$ = this.languageSwitchService.selectedLanguage$;

  @Input({ required: true })
  folder!: FoldersEntity;

  @Output() deleteFolder = new EventEmitter();

  @Output() redirectToMaterials = new EventEmitter();

  public formatDate(timestamp: number): Observable<string> {
    return this.locale$.pipe(map((locale) => new Date(timestamp).toLocaleDateString(locale)));
  }

  public onDeleteFolder(event: Event) {
    this.deleteFolder.emit();
  }

  redirectToMaterialsPage(event: Event) {
    this.redirectToMaterials.emit(this.folder.id);
  }
}
