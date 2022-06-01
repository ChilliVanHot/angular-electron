import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './main/main.component';
import { AngularSplitModule } from 'angular-split';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';


const routes: Routes = [
    {
        path: '',
        component: MainComponent
    }
];


@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AngularSplitModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        MomentModule,
        HttpClientModule,
        TranslateModule
    ]
})
export class UsersModule { }
