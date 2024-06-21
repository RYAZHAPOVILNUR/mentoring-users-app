import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import  localeRu  from '@angular/common/locales/ru';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { IFolderVM } from '../../folders.vm';

registerLocaleData(localeRu)
@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true}) folder!: IFolderVM
  @Output() deleteFolder = new EventEmitter();

  public date(time: string){
    return new Date(time).toLocaleDateString()
  }

  onDeleteFolder (folder: IFolderVM) {
    this.deleteFolder.emit(folder)
  }
}
