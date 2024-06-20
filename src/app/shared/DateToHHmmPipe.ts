import { Pipe, PipeTransform } from '@angular/core';

@Pipe({standalone: true, name: 'dateToHHmm'})
export class DateToHHmmPipe implements PipeTransform {
  transform(value: string): string {
    const timeParts = value.split(':');
    const date = new Date();
    date.setHours(+timeParts[0]);
    date.setMinutes(+timeParts[1]);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
}
