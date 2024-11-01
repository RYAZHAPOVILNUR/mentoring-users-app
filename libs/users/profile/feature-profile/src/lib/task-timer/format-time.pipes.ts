import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatTime', standalone: true })
export class FormatTime implements PipeTransform {
    transform(value: number): string {
        const
            d = Math.floor(value / (3600 * 24)).toString().padStart(2, '0'),
            h = Math.floor((value % (3600 * 24)) / 3600).toString().padStart(2, '0'),
            m = Math.floor(value % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(value % 60).toString().padStart(2, '0');
        return d + ':' + h + ':' + m + ':' + s;
    }
}