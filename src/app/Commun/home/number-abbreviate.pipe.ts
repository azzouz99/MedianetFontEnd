import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberAbbreviate'
})
export class NumberAbbreviatePipe implements PipeTransform {


  transform(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (value >= 1e6) {
      return Math.floor(value / 1e6) + 'M';
    }
    if (value >= 1e5) {
      return Math.floor(value / 1e3) + 'K';
    }
    return value.toString();
  }

}
