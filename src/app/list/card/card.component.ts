import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() todo:Todo;
  constructor(private todoService:TodoService) { }


  ngOnInit() {
  }
  deleteCandidature() {
    this.todoService.dropTodo(this.todo.id);
  }
  changeState() {
    this.todoService.changeState(this.todo.done, this.todo.id);
  }

}


