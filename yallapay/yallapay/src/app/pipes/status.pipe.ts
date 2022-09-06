import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
})
export class status implements PipeTransform {
  transform(list: any[], value: string) {
    return value ? list.filter((item) => item.status == value) : list;
  }
}
