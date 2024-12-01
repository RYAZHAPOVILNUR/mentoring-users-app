import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): string {
    const
      d = Math.floor(value / (3600 * 24)).toString().padStart(1, '0'),
      h = Math.floor((value % (3600 * 24)) / 3600).toString().padStart(1, '0'),
      m = Math.floor(value % 3600 / 60).toString().padStart(2, '0'),
      s = Math.floor(value % 60).toString().padStart(2, '0');
    return d + 'д' + " "+  h + 'ч' + " "+ m + ':' + s;
  }
}
