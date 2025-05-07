import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatedTime',
  pure: true,
  standalone: true,
})
export class FormatedTimePipe implements PipeTransform {
  transform(time: number) {
    return time < 10 ? `0${time}` : time;
  }
}
