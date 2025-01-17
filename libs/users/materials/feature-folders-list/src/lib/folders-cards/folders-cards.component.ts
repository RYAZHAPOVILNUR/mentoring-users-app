import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'materials-folders-cards',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, AsyncPipe, DatePipe],
  templateUrl: './folders-cards.component.html',
  styleUrls: ['./folders-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardsComponent {
  private readonly isIconVisibleSubject$ = new BehaviorSubject<boolean>(false);
  public readonly isIconVisible$ = this.isIconVisibleSubject$.asObservable();
  // private readonly datePipe = inject(DatePipe);
  // public today: number = Date.now();
  // private locale = 'ru-RU';
  //
  // public getFormatDate(date: number): string | null {
  //   return this.datePipe.transform(date, 'd MMMM, yyyy', undefined, this.locale);
  // }

  public showIcon(isVisible: boolean): void {
    this.isIconVisibleSubject$.next(isVisible);
  }
}
