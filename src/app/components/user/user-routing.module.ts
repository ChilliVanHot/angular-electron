import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetSecurityComponent } from './forget/forget-security/forget-security.component';
import { LoginComponent } from './login/login.component';
import { RegisterDetailsComponent } from './register/register-details/register-details.component';
import { RegisterSecurityComponent } from './register/register-security/register-security.component';
import { RegisterPinComponent } from './register/register-pin/register-pin.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginComponent
    },

    // Register Pages
    {
        path: 'register-security',
        component: RegisterSecurityComponent
    },
    {
        path: 'register-details',
        component: RegisterDetailsComponent
    },
    {
        path: 'register-pin',
        component: RegisterPinComponent
    },

    // Forgot password pages
    {
        path: 'forget-security',
        component: ForgetSecurityComponent
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
