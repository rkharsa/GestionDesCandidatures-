import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule,MatIconModule,MatTableModule,MatButtonModule,MatSlideToggleModule} from '@angular/material';
import { ListComponent } from './list/list.component';
import {   Routes,RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FiltrerPipe } from './pipe/filtrer.pipe';
import { CardComponent } from './list/card/card.component';
import { AddCandidatureFormComponent } from './list/add-candidature-form/add-candidature-form.component';

const route:Routes=[
{path:'list',component:ListComponent},
  {path:'add',component:AddCandidatureFormComponent},
{path:'',component:ListComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FiltrerPipe,
    CardComponent,
    AddCandidatureFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    RouterModule.forRoot(route),
    HttpClientModule,MatSlideToggleModule

  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
