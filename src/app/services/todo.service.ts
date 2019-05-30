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
  getEtat(etat: number) {
    //0 pas de reponse 1 en cours 2 accepter  // 3 refuser
    switch (etat) {
      case 0:
        return "Pas de Reponse";
      case 1:
        return "En cours";
      case 2:
        return "Accepter"
      case 3:
        return "Refuser"
    }
  }
  changeState(state: number, idTodo: number) {
    console.log(state);
    for (let i = 0; i < this.todos.length; i++) {
      if (idTodo === this.todos[i].id) {
        switch (state) {
          case 0:

            this.updateTodo(i, 1);
            break;
          case 1:
            this.updateTodo(i, 2);
            break;
          case 2:
            this.updateTodo(i, 3);
            break;
          case 3:
            this.updateTodo(i, 0);
            break;
        }
      }
    }
  }
  updateTodoComplete(id: number, todo: Todo) {
    console.log(todo.name);
    this.todos[id].name = todo.name;
    this.todos[id].descriptionE = todo.descriptionE;
    this.todos[id].competence = todo.competence;
    this.todos[id].societe = todo.societe;
    this.todos[id].tache = todo.tache;
    this.emitTodo();
    this.saveTodos();

  }

  dropTodo(idTodo: number) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id == idTodo) {
        this.todos.splice(i, 1);
        this.saveTodos();
        this.emitTodo();
        break;
      }
    }
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
