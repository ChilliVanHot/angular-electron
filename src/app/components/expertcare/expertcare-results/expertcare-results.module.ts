import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ExpertcareResultsComponent } from './expertcare-results.component';
import { PrintModalComponent } from '../../../application/modals/print-modal/print-modal.component';

import { TranslateModule } from '@ngx-translate/core';




const routes: Routes = [
    {
        path: '',
        component: ExpertcareResultsComponent
    }
];


@NgModule({
    declarations: [
        ExpertcareResultsComponent,
        PrintModalComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslateModule
    ]
})
export class ExpertcareResultsModule { }
