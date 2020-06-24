import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
import { ListComponent } from '../../pages/list/list.component';
import { AddCandidatureFormComponent } from '../../pages/list/add-candidature-form/add-candidature-form.component';
import { FiltrerPipe } from '../../pages/pipe/filtrer.pipe';
import { CardComponent } from '../../pages/list/card/card.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SignInComponent } from '../../pages/sign-in/sign-in.component';
import { RegisterComponent } from '../../pages/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCtU_gREM0dlzPhS_9a41F2FmXBK09y7Z4'
    })
  ],
  declarations: [
    FiltrerPipe,
    ListComponent,
    CardComponent,
    AddCandidatureFormComponent,
    SignInComponent,
    RegisterComponent,
    AddCandidatureFormComponent
  ]
})

export class AdminLayoutModule {}
