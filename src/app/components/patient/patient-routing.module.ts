import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent } from './patient.component';
import { AngularSplitModule } from 'angular-split';

const routes: Routes = [

    {
        path: '',
        component: PatientComponent,

        children: [
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes), AngularSplitModule.forRoot() ],
    exports: [RouterModule]
})
export class PatientRoutingModule { }
