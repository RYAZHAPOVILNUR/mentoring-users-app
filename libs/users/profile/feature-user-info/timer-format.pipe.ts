import { Pipe, PipeTransform } from '@angular/core';
import { IUserTimer } from './user-timer.interface';

@Pipe({
  name: 'timerFormat',
  standalone: true,
})
export class TimerFormatPipe implements PipeTransform {
  transform(timer: IUserTimer | null): string {
    if (!timer) return '0д 0ч 00:00';

    const days = timer.days;
    const hours = timer.hours;
    const minutes = timer.minutes.toString().padStart(2, '0');
    const seconds = timer.seconds.toString().padStart(2, '0');

    return `${days}д ${hours}ч ${minutes}:${seconds}`;
  }
}
