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
  user: firebase.User;


  constructor() {
  }
  ngOnInit() { }
  emitTodo() {
    this.todoSubject.next(this.todos);
  }


  addTodo(todo: Todo) {
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
    for (let i = 0; i < this.todos.length; i++) {
      if (idTodo === this.todos[i].id) {
        if (state < 3) {
          state += 1;
        } else {
          state = 0;
        }
        this.updateTodo(i, state);
        break;
      }
    }
  }
  updateTodoComplete(id: number, todo: Todo) {
    this.todos[id] = todo;
    this.emitTodo();
    this.saveTodos();

  }

  dropTodo(idTodo: number) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === idTodo) {
        this.todos.splice(i, 1);
        this.saveTodos();
        this.emitTodo();
        break;
      }
    }
  }

  getTodos() {
    this.user = firebase.auth().currentUser;
    firebase.database().ref(`/Users/${this.user.uid}/taches`).orderByChild('priority').on('value', (data: DataSnapshot) => {
      this.todos = data.val() ? data.val() : [];
      this.emitTodo();
    }
    );

  }


  saveTodos() {
    this.user = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`/Users/${this.user.uid}/taches`)
      .set(this.todos);
  }
}
