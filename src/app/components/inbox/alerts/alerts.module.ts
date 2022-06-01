import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';

import { MainComponent } from './main/main.component';
import { AngularSplitModule } from 'angular-split';


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
        TranslateModule
    ]
})
export class AlertsModule { }
