import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatTimePipe",
  standalone: true,
})
export class FormatTimePipe implements PipeTransform {
  
  transform (value: number): string {
    const days = Math.floor(value / 86400);
    const remainingAfterDays = value - (days * 86400);
    const hours = Math.floor(remainingAfterDays / 3600);
    const remainingAfterHours = remainingAfterDays - (hours * 3600);
    const minutes = Math.floor(remainingAfterHours / 60);
    const seconds = remainingAfterHours % 60;
    return [
      days.toString().padStart(2, "0"),
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  }
}
