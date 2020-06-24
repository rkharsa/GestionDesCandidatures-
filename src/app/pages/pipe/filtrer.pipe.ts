import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'filtrer'
})
export class FiltrerPipe implements PipeTransform {
  transform(items: any[], term: string): any[] {
    if (! items|| !term) {
      return items;
    }

    return items.filter(
      item => {
        const dataStr = JSON.stringify(item).toLowerCase();
        return dataStr.indexOf(term.toLowerCase()) != -1;
      }
    );
  }

}
