import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'visibleOnly'
})
export class VisibleOnlyPipe implements PipeTransform {

  constructor() { }

  transform(items): any {
    return items.filter(item => !item.isHidden);
  }
}
