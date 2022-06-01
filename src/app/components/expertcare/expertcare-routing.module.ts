import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ExpertCareClinicalDetailsComponent } from './expert-care-clinical-details/expert-care-clinical-details.component';
// import { ExpertCareDetailComponent } from './expert-care-detail/expert-care-detail.component';
// import { ExpertCareMedicationComponent } from './expert-care-medication/expert-care-medication.component';
// import { ExpertCareComponent } from './expert-care/expert-care.component';

import { ExpertcareIframeComponent } from './iframe/expertcare-iframe.component';


const routes: Routes = [

    {
        path: '',
        redirectTo: '/application/expertcare/iframe',
        pathMatch: 'full'
    },
    {
        path: 'iframe',
        component: ExpertcareIframeComponent
    },
    // {
    //     path: 'expertcare-results',
    //     loadChildren: () => import('./expertcare-results/expertcare-results.module').then(m => m.ExpertcareResultsModule)
    // },
    // {
    //     path: 'expert-care',
    //     component: ExpertCareComponent
    // },
    // {
    //     path: 'expert-care-detail',
    //     component: ExpertCareDetailComponent
    // },
    // {
    //     path: 'expert-care-clinical-details',
    //     component: ExpertCareClinicalDetailsComponent
    // },
    // {
    //     path: 'expert-care-medication',
    //     component: ExpertCareMedicationComponent
    // },
];



@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ExpertcareRoutingModule { }
