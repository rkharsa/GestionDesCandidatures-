import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormBuilder, NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import {Router} from '@angular/router';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-add-candidature-form',
  templateUrl: './add-candidature-form.component.html',
  styleUrls: ['./add-candidature-form.component.scss']
})
export class AddCandidatureFormComponent implements OnInit {
  myDate = new Date();
  formatteAddress="";
  options={
    componentRestrictions:{
      country:['FR']
     }
  };
  todoFormGroup:FormGroup;
  AddressFormGroup:FormGroup;
  constructor(private todoService: TodoService, private formBuilder: FormBuilder,private router: Router) {
    this.initForm();
   }

  ngOnInit() {

  }
  initForm(){
    this.AddressFormGroup=this.formBuilder.group({
      address:['',Validators.required],
      lat:['',Validators.required],
      lng:['',Validators.required]

    });
    this.todoFormGroup=this.formBuilder.group({
      id:[this.todoService.todos.length,Validators.required],
      name:['',Validators.required],
      societe:['',Validators.required],
      descriptionE:['',Validators.required],
      competence:['',Validators.required],
      tache:['',Validators.required],
      priority:[0,Validators.required],
      email:['',Validators.required],
      link:['',Validators.required],
      tel:['',Validators.required],
      response:['',Validators.required],
      dateCreated:[this.myDate.toString(),Validators.required],
      done:["0",Validators.required],
      address:this.AddressFormGroup
    });
  }
  onSubmit() {
    this.todoService.addTodo(this.todoFormGroup.value);

    this.todoService.emitTodo();
    this.todoService.saveTodos();
    this.router.navigate(['dashboard']);
  }

  public handleAddressChange(address: any) {

    this.formatteAddress=address.formatted_address;
    this.AddressFormGroup.get("lat").setValue(address.geometry.location.lat());
    this.AddressFormGroup.get("lng").setValue(address.geometry.location.lng());
    this.AddressFormGroup.get("address").setValue(this.formatteAddress);
}
  list(){
    this.router.navigate(['dashboard']);
  }
}
