import { Routes } from '@angular/router';
import { AuthGuard } from './packages/auth/auth.guard';
import { LoginComponent } from './packages/login/login.component';
import { PatientComponent } from './packages/patient/component/patient.component';
import { UserComponent } from './packages/user/component/user.component';


export const appRoutes: Routes = [
  {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'user', component: UserComponent, canActivate: [AuthGuard] 
    },
    {
        path: 'patient', component: PatientComponent, canActivate: [AuthGuard] 
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];

