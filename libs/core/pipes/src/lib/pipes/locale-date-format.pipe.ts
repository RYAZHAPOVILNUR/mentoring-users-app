import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'localeDateFormat',
  pure: true,
  standalone: true,
})
export class LocaleDateFormatPipe implements PipeTransform {
  transform(timeStamp: string) {
    const date = new Date(timeStamp)
    const localeDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)} ${date.getFullYear()}`
    return localeDate
  }
}
