import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';

import { ReportsComponent } from './reports.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [

    {
        path: '',
        component: ReportsComponent,

        children: [
            {
                path: '',
                redirectTo: 'main',
                pathMatch: 'full'
            },
            {
                path: 'main',
                component: MainComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes), AngularSplitModule.forRoot()],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
