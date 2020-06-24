import { Routes } from '@angular/router';


import { ListComponent } from '../../pages/list/list.component';
import { AddCandidatureFormComponent } from '../../pages/list/add-candidature-form/add-candidature-form.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { AuthGardService } from '../../pages/services/auth-gard.service';
import { SignInComponent } from '../../pages/sign-in/sign-in.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',canActivate: [AuthGardService],component:ListComponent },
    { path: 'add',canActivate: [AuthGardService] , component:AddCandidatureFormComponent },
    { path: 'login',          component: SignInComponent },
    { path: 'register',       component: RegisterComponent },
    { path: '/',       component: SignInComponent }

];
