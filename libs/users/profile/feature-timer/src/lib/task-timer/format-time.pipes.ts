import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatTimePipe",
  standalone: true,
})
export class FormatTimePipe implements PipeTransform {
  
  transform (value: number): string {
    const days = Math.floor(value / 86400);
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;
    return [
      days.toString().padStart(2, "0"),
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  }
}
