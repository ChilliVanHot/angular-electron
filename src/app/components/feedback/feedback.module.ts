import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';
import { MomentModule } from 'ngx-moment';
import { TranslateModule} from '@ngx-translate/core';


import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';



@NgModule({
    declarations: [
        FeedbackComponent
    ],
    imports: [
        CommonModule,
        FeedbackRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularSplitModule.forRoot(),
        ReactiveFormsModule,
        NgbModule,
        MomentModule,
        TranslateModule
    ]
})
export class FeedbackModule { }
