import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'getDate',
    standalone: true
})
export class GetDatePipe implements PipeTransform {
    transform(created_at: number): string {
        const date = new Date(created_at);
        return `
            ${String(date.getDate()).padStart(2, '0')}.
            ${String(date.getDay() + 1).padStart(2, '0')}.
            ${date.getFullYear()}`;
    }
}