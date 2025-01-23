import { ChangeDetectionStrategy, Component, inject, Input, LOCALE_ID } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { TFoldersVM } from '@users/materials/data-access';

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
  folder!: TFoldersVM;

  // time = this.folder.createdAt;

  private readonly isIconVisibleSubject$ = new BehaviorSubject<boolean>(false);
  public readonly isIconVisible$ = this.isIconVisibleSubject$.asObservable();

  private lang: string = <string>localStorage.getItem('lang');
  private showLang(): void {
    console.log(this.lang);
  }
  constructor() {
    this.showLang();
  }

  // private readonly dateService = inject(DateService);
  // public formattedDate$ = this.dateService.formatDate(new Date(this.time));
  // private changeLang(lang: 'ru' | 'en'): void {
  //   this.dateService.setLanguage(lang);
  // }

  public onShowIcon(isVisible: boolean): void {
    this.isIconVisibleSubject$.next(isVisible);
  }
}
