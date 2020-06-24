import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { TodoService } from './pages/services/todo.service';
import { AuthGardService } from './pages/services/auth-gard.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    GooglePlaceModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [TodoService,TodoService,AuthGardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
