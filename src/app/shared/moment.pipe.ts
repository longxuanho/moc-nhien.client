import { Pipe, PipeTransform } from '@angular/core';
import { timeConfig } from '../core/shared/app-config';

declare var moment;

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  constructor() { }

  transform(value: string): any {
    return moment(value, timeConfig.defaultDateHourFormat).fromNow();
  }

}
