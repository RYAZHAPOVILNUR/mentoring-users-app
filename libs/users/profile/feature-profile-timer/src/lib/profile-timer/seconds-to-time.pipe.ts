import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'secondsToTime',
  pure: true,
  standalone: true,
})
export class SecondsToTimePipe implements PipeTransform {
  transform(seconds: number | null) {
    if(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds - hours * 3600) / 60);
      seconds = seconds - hours * 3600 - minutes * 60;

      const h = hours < 10 ? '0' + hours : hours;
      const m = minutes < 10 ? '0' + minutes : minutes;
      const s = seconds < 10 ? '0' + seconds : seconds;
      return `${h}:${m}:${s}`;
    } else return '00:00:00'

  }
}
