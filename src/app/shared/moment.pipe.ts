import { Pipe, PipeTransform } from '@angular/core';

declare var moment;

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  constructor() { }

  transform(value: string, format: string): any {
    return format ? moment(value).format(format) : moment(value).fromNow();
  }

}
