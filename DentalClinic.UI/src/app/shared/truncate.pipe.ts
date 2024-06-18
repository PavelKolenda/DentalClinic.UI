import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 250, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (value.length <= limit) {
      return value;
    }

    const finalLimit = completeWords ? value.substr(0, limit).lastIndexOf(' ') : limit;
    return `${value.substr(0, finalLimit)}${ellipsis}`;
  }
}
