import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import localeRu from '@angular/common/locales/ru';
import { IFolder } from 'libs/users/materials/data-access/src/lib/models/folders/folders.models';
import { MaterialsService } from 'libs/users/materials/data-access/src/lib/services/services';
import {

    inject,
    ViewEncapsulation,
  } from '@angular/core';
  import { Observable } from 'rxjs';

registerLocaleData(localeRu);

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, DatePipe, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
    @Input({ required: true })
    folder!: IFolder;
  
    @Output()
    deleteFolder = new EventEmitter();
  
    public readonly materialsService = inject(MaterialsService);
    public translatedDate$!: Observable<string>;
  
    ngOnInit() {
      this.translatedDate$ = this.materialsService.translateDate(this.folder.created_at);
    }
  
    onDeleteFolder(event: Event) {
      event.stopPropagation();
      this.deleteFolder.emit();
    }

}