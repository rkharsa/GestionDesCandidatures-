import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule, MatIconModule, MatTableModule, MatButtonModule, MatSlideToggleModule } from '@angular/material';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FiltrerPipe } from './pipe/filtrer.pipe';
import { CardComponent } from './list/card/card.component';
import { AddCandidatureFormComponent } from './list/add-candidature-form/add-candidature-form.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGardService } from './services/auth-gard.service';
import { AuthService } from './services/auth.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AgmCoreModule} from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
const route: Routes = [
  { path: 'auth/signIn', component: SignInComponent },
  { path: 'auth/signUp', component:SignUpComponent },
  { path: 'list', canActivate: [AuthGardService], component: ListComponent },
  { path: 'add', canActivate: [AuthGardService], component: AddCandidatureFormComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list' }
];
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FiltrerPipe,
    CardComponent,
    AddCandidatureFormComponent,
    SignInComponent,
    SignUpComponent
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
    GooglePlaceModule,
    RouterModule.forRoot(route),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCtU_gREM0dlzPhS_9a41F2FmXBK09y7Z4'
    }),
    HttpClientModule, MatSlideToggleModule

  ],
  providers: [TodoService, AuthGardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
