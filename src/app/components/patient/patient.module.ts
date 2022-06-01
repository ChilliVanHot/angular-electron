import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumbersPipe } from '../../shared/pipes/numbers.pipe';
import { TranslateModule} from '@ngx-translate/core';

import { PatientRoutingModule } from './patient-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';

import { PatientComponent } from './patient.component';
import { MomentModule } from 'ngx-moment';

@NgModule({
    declarations: [
        PatientComponent,
        NumbersPipe
    ],
    imports: [
        CommonModule,
        PatientRoutingModule,
        AngularSplitModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        MomentModule,
        TranslateModule
    ]
})
export class PatientModule { }
