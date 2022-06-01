import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { TranslateModule } from '@ngx-translate/core';

import { ExpertcareRoutingModule } from './expertcare-routing.module';
import { ExpertcareIframeComponent } from './iframe/expertcare-iframe.component';

import { ExpertCareClinicalDetailsComponent } from './expert-care-clinical-details/expert-care-clinical-details.component';
import { ExpertCareDetailComponent } from './expert-care-detail/expert-care-detail.component';
import { ExpertCareMedicationComponent } from './expert-care-medication/expert-care-medication.component';
import { ExpertCareComponent } from './expert-care/expert-care.component';



@NgModule({
    declarations: [
        SafePipe,
        ExpertcareIframeComponent,
        ExpertCareClinicalDetailsComponent,
        ExpertCareDetailComponent,
        ExpertCareMedicationComponent,
        ExpertCareComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        ExpertcareRoutingModule,
        TranslateModule
    ]
})
export class ExpertcareModule { }
