import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { TFolderVM } from '@users/materials/data-access';

@Component({
  selector: 'materials-folder-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, AsyncPipe, DatePipe],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: TFolderVM;

  @Output() deleteFolder = new EventEmitter();

  @Output() redirectToMaterials = new EventEmitter();

  private readonly isIconVisibleSubject$ = new BehaviorSubject<boolean>(false);
  public readonly isIconVisible$ = this.isIconVisibleSubject$.asObservable();

  public onShowIcon(isVisible: boolean): void {
    this.isIconVisibleSubject$.next(isVisible);
  }

  public onDeleteFolder(): void {
    this.deleteFolder.emit();
  }

  public onRedirectToFolderPage(): void {
    this.redirectToMaterials.emit(this.folder.id);
  }
}
