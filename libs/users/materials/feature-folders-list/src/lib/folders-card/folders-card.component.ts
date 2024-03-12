import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChangeVisibilityDirective } from '@users/core/utils'
@Component({
  selector: 'folder-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ChangeVisibilityDirective
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: Folder;
  @ViewChild("deleteButton", { read: ElementRef, static: true })
  deleteBtn!: ElementRef<HTMLButtonElement>
  @Output()
  deleteFolder = new EventEmitter();
  @Output()
  redirectToMaterials = new EventEmitter()


  public onDeleteUser(event: MouseEvent) {
    event.stopPropagation()
    this.deleteFolder.emit()
  }

  public onRedirectToMaterials() {
    this.redirectToMaterials.emit()
  }
}
