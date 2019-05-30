import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'filtrer'
})
export class FiltrerPipe implements PipeTransform {
  transform(todos: Todo[], term: string): Todo[] {
    if (! todos|| !term) {
      return todos;
    }

    return todos.filter(
      todo => todo.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
    );
  }

}
