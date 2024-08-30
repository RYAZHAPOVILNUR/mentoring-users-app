import { Pipe, PipeTransform} from '@angular/core'

@Pipe({
  standalone: true,
  name: 'secondsToTime',
  pure: true,
})
export class SecondsToTimePipe implements PipeTransform {
  transform(seconds: number | null) {
    if(seconds) {
      let date = new Date(0);
      date.setSeconds(seconds);
      let timeString = date.toISOString().substring(11, 19);
      return timeString;
    } else return '00:00:00'
  }
}
