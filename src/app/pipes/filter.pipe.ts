import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(value: string[], pattern: string): string[] {
    if (!pattern) {
      return value;
    }

    return value.filter(item => item.indexOf(pattern) >= 0);
  }

}
