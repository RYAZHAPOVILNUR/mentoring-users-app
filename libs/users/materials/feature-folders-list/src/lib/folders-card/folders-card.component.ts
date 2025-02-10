import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { TFolderVM } from '@users/materials/data-access';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

@Component({
  selector: 'materials-folder-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, AsyncPipe, DatePipe],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class FoldersCardComponent implements OnInit {
  private readonly datePipe = inject(DatePipe);

  @Input({ required: true })
  folder!: TFolderVM;

  @Output() deleteFolder = new EventEmitter();

  @Output() redirectToMaterials = new EventEmitter();

  public dateCreateAt!: string;

  ngOnInit(): void {
    this.dateCreateAt = this.datePipe.transform(this.folder.createdAt, 'd MMMM, yyyy', undefined, 'ru') ?? 'created at';
  }

  private readonly isIconVisibleSubject$ = new BehaviorSubject<boolean>(false);
  public readonly isIconVisible$ = this.isIconVisibleSubject$.asObservable();

  public onShowIcon(isVisible: boolean): void {
    this.isIconVisibleSubject$.next(isVisible);
  }

  public onDeleteFolder(): void {
    this.deleteFolder.emit();
  }

  public onRedirectToFolderPage(): void {
    this.redirectToMaterials.emit();
  }
}
