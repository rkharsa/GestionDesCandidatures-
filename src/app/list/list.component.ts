import { Component, OnInit, Input } from '@angular/core';
import { Subscription, empty } from 'rxjs';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { DatePipe, formatDate } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit {

  compteurTodo:  number ;
  premierClick: boolean =false;
  id: number;
  formGroupSearch: FormGroup;
  todos: Todo[];
  todosSubscription: Subscription;
  tabCompteurInput: number[] = new Array();
  suppressionMultiple: boolean = false;
  taille: number = 0;
  myDate = new Date();
  modification :boolean=false;
  modificationList: boolean[] = new Array();
  constructor(private todoService: TodoService, private formBuilder: FormBuilder) {

  }

  modificationClick(){
    if(this.modification==false) {
    this.modification=true;
    } else {
    this.modification=false;
    }
  }
 initCompteurTodo(i:number){
    this.compteurTodo=i;
 }
  initForm() {
    this.formGroupSearch = this.formBuilder.group({
      search: ''
    });
  }

  modifLigneSave(form: NgForm) {
    for (let i = 0; i < this.modificationList.length; i++) {
      if (this.modificationList[i] === true) {
        console.log(form.value[i + "name"]);
        console.log(form.value[i + "priority"]);

        if (this.todos[i].name !== form.value[i + "name"] || this.todos[i].priority !== form.value[i + "priority"] || this.todos[i].response !== form.value[i + "response"]
          || this.todos[i].link !== form.value[i + "link"] || this.todos[i].tel !== form.value[i + "tel"]) {

          this.todos[i].name = form.value[i + "name"];
          this.todos[i].priority = form.value[i + "priority"];
          this.todos[i].link = form.value[i + "link"];
          this.todos[i].response = form.value[i + "response"];
          this.todos[i].tel = form.value[i + "tel"];


          this.modificationList[i] = false;
        }

      }


    }

    this.todoService.emitTodo();
    this.todoService.saveTodos();

  }

  suppligne(i: number) {
    this.tabCompteurInput.splice(i, 1);
  }

  onSubmit(form: NgForm) {
    var todo: Todo;
    for (let i = 0; i < this.tabCompteurInput.length; i++) {
      //if (this.todos.length === 0) {
        console.log(this.myDate);
        console.log(form.value[this.tabCompteurInput[i] + "name"]);
        console.log(form.value[this.tabCompteurInput[i] + "societe"]);
        console.log(form.value[this.tabCompteurInput[i] + "description"]);
        console.log(form.value[this.tabCompteurInput[i] + "priority"]);
        console.log(form.value[this.tabCompteurInput[i] + "email"]);
        console.log(form.value[this.tabCompteurInput[i] + "tel"]);
        console.log(form.value[this.tabCompteurInput[i] + "response"]);

      todo = new Todo(this.todos.length,form.value[this.tabCompteurInput[i] + "name"], form.value[this.tabCompteurInput[i] + "societe"]
        , form.value[this.tabCompteurInput[i] + "description"],form.value[this.tabCompteurInput[i] + "competence"],form.value[this.tabCompteurInput[i] + "tache"], form.value[this.tabCompteurInput[i] + "priority"]
        , form.value[this.tabCompteurInput[i] + "email"], form.value[this.tabCompteurInput[i] + "link"], form.value[this.tabCompteurInput[i] + "tel"],
        " ", this.myDate.toString(), 0);

      this.todoService.addTodo(todo);
    }
    this.todoService.emitTodo();
    this.todoService.saveTodos();
    this.taille = 0;
    this.tabCompteurInput = new Array();

  }
  public modificationSubmit(form: NgForm,id:number){
    for(let i =0 ; i<this.todos.length;i++){
      if(this.todos[i].id==id){
        this.todos[i].name=form.value["name"];
        this.todos[i].descriptionE=form.value["description"];
        this.todos[i].societe=form.value["societe"];
        this.todos[i].tache=form.value["tache"];
        this.todos[i].competence=form.value["competence"];
      this.todoService.updateTodoComplete(id,this.todos[i]);
       // this.todos[i].tel=form.value["tel"];
        //this.todos[i].email=form.value["email"];
      }
    }
    this.modification=false;

  }
  data( ){

    return  this.todos[this.id];
  }
  initId(id:number){
  this.premierClick=true;
  this.id=id;
  }
  add() {

    this.tabCompteurInput.push(this.taille);
    this.taille += 1;
  }
  changeState(state: number, idTodo: number) {
    console.log(state);
    for (let i =0 ; i<this.todos.length;i++){
      if(idTodo=== this.todos[i].id){
        switch(state){
          case 0:

              this.todoService.updateTodo(i, 1);
          break;
          case 1:
              this.todoService.updateTodo(i, 2);
            break;
            case 2:
                this.todoService.updateTodo(i, 3);
              break;
              case 3:
                  this.todoService.updateTodo(i, 0);
                break;
        }
      }
    }
  }
  getEtat(etat : number){
    //0 pas de reponse 1 en cours 2 accepter  // 3 refuser
    switch(etat){
      case 0 :
        return "Pas de Reponse";
        case 1:
        return "En cours";
        case 2 :
        return "Accepter"
        case 3:
        return "Refuser"
    }
  }
fermerInfo(){
  this.premierClick=false;
}
  deleteL(id: number) {
    for(let i =0 ; i<this.todos.length;i++){
      if(this.todos[i].id==id){
    this.premierClick=false;
    this.todoService.dropTodo(i);
    break;
      }
    }

  }
  ngOnInit() {
    this.initForm();
    this.todoService.getTodos();
    this.todosSubscription = this.todoService.todoSubject.subscribe(
      (data: Todo[]) => {

        this.todos = data;

        for (let i = 0; i < this.todos.length; i++) {
          this.modificationList.push(false);
          console.log(this.modificationList[i]);
        }
      }
    );
}

}
