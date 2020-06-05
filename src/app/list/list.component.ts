import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit {

  compteurTodo: number;
  premierClick: boolean;
  id: number;
  formGroupSearch: FormGroup;
  todos: Todo[];
  todosSubscription: Subscription;
  modification: boolean = false;
  showSpinner:boolean=true;
  constructor(private todoService: TodoService, private formBuilder: FormBuilder) {
    this.premierClick = false;
    this.initForm();
    this.todoService.getTodos();
    this.todosSubscription = this.todoService.todoSubject.subscribe(
      (data: Todo[]) => {
        this.todos = data;
        this.showSpinner=false;
      }
    );
  }
  ngOnInit() {
    this.premierClick = false;
    this.initForm();
    this.todoService.getTodos();
    this.todosSubscription = this.todoService.todoSubject.subscribe(
      (data: Todo[]) => {
        this.todos = data;
        this.showSpinner=false;
      }
    );
  }
  getPremierClick() {
    return this.premierClick;
  }
  modificationClick() {
    if (this.modification == false) {
      this.modification = true;
    } else {
      this.modification = false;
    }
  }
  initCompteurTodo(i: number) {
    this.compteurTodo = i;
  }
  initForm() {
    this.formGroupSearch = this.formBuilder.group({
      search: ''
    });
  }

  public modificationSubmit(form: NgForm, id: number) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id == id) {
        this.todos[i].name = form.value["name"];
        this.todos[i].descriptionE = form.value["description"];
        this.todos[i].societe = form.value["societe"];
        this.todos[i].tache = form.value["tache"];
        this.todos[i].competence = form.value["competence"];
        this.todoService.updateTodoComplete(id, this.todos[i]);
        // this.todos[i].tel=form.value["tel"];
        //this.todos[i].email=form.value["email"];
      }
    }
    this.modification = false;

  }
  data() {

    return this.todos[this.id];
  }
  initId(id: number) {
    this.premierClick = true;
    this.id = id;
  }

  changeState(state: number, idTodo: number) {
    this.todoService.changeState(state, idTodo);
  }
  getEtat(etat: number) {
    return this.todoService.getEtat(etat);
  }
  fermerInfo() {
    this.premierClick = false;
  }
  deleteL(id: number) {
    this.premierClick = false;
    this.todoService.dropTodo(id);
  }


}
