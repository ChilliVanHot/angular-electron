import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule} from '@ngx-translate/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterDetailsComponent } from './register/register-details/register-details.component';
import { RegisterSecurityComponent } from './register/register-security/register-security.component';
import { RegisterPinComponent } from './register/register-pin/register-pin.component';
import { ForgetSecurityComponent } from './forget/forget-security/forget-security.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterDetailsComponent,
        RegisterSecurityComponent,
        RegisterPinComponent,
        ForgetSecurityComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        HttpClientModule,
        TranslateModule
    ]
})
export class UserModule { }
