import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() societe: string;
  @Input() descriptionE: string;
  @Input() competence: string;
  @Input() tache: string;
  @Input() priority: number;
  @Input() email: string;
  @Input() link: string;
  @Input() tel: number;
  @Input() response: string;
  @Input() date_created: string;
  @Input() done: number;
  @Input() indice: number;

  constructor(private todoService:TodoService) { }


  ngOnInit() {
  }
  deleteCandidature() {
    this.todoService.dropTodo(this.id);
  }
  changeState() {
    this.todoService.changeState(this.done, this.id);
  }

}


