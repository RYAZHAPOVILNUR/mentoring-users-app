import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { IFolder } from 'libs/users/materials/data-access/src/lib/models/folder.model';
import { MaterialsService } from 'libs/users/materials/data-access/src/lib/services/materials.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, TranslateModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
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
