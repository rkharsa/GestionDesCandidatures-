import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnInit {

  todos: Todo[] = [];
  todoSubject = new Subject<Todo[]>();

  constructor() {


  }
  ngOnInit() {
    this.getTodos();

  }
  emitTodo() {
    this.todoSubject.next(this.todos);
  }


  addTodo(todo: Todo) {

    console.log("add");
    console.log(todo);
    this.todos.push(todo);
    this.emitTodo();
    this.saveTodos();

  }
  updateTodo(id: number, stateChange: number) {

    this.todos[id].done = stateChange;
    this.emitTodo();
    this.saveTodos();

  }
  updateTodoComplete(id: number, todo:Todo) {
console.log(todo.name);
    this.todos[id].name = todo.name;
    this.todos[id].descriptionE = todo.descriptionE;
    this.todos[id].competence = todo.competence;
    this.todos[id].societe = todo.societe;
    this.todos[id].tache = todo.tache;
    this.emitTodo();
    this.saveTodos();

  }

  dropTodo(i: number) {
    this.todos.splice(i, 1);
    this.saveTodos();
    this.emitTodo();

  }

  getTodos() {

    firebase.database().ref("/Users/1/taches").orderByChild('priority').on('value', (data: DataSnapshot) => {
      this.todos = data.val() ? data.val() : [];

      this.emitTodo();
    }
    );

  }


  saveTodos() {
    firebase
      .database()
      .ref('/Users/1/taches')
      .set(this.todos);
  }
}
