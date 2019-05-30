import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-add-candidature-form',
  templateUrl: './add-candidature-form.component.html',
  styleUrls: ['./add-candidature-form.component.scss']
})
export class AddCandidatureFormComponent implements OnInit {
  taille: number = 0;
  tabCompteurInput: number[] = new Array();
  myDate = new Date();
  constructor(private todoService: TodoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    var todo: Todo;
    for (let i = 0; i < this.tabCompteurInput.length; i++) {
      todo = new Todo(this.todoService.todos.length, form.value[this.tabCompteurInput[i] + "name"],
        form.value[this.tabCompteurInput[i] + "societe"]
        , form.value[this.tabCompteurInput[i] + "description"], form.value[this.tabCompteurInput[i] + "competence"],
        form.value[this.tabCompteurInput[i] + "tache"], form.value[this.tabCompteurInput[i] + "priority"]
        , form.value[this.tabCompteurInput[i] + "email"], form.value[this.tabCompteurInput[i] + "link"],
        form.value[this.tabCompteurInput[i] + "tel"],
        " ", this.myDate.toString(), 0);
      this.todoService.addTodo(todo);
    }
    this.todoService.emitTodo();
    this.todoService.saveTodos();
    this.taille = 0;
    this.tabCompteurInput = new Array();
  }
  add() {

    this.tabCompteurInput.push(this.taille);
    this.taille += 1;
  }
  suppligne(i: number) {
    this.tabCompteurInput.splice(i, 1);
  }
}
