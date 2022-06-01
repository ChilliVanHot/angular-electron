import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationRoutingModule } from './application-routing.module';
import { BaseComponent } from './base/base.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ReportService } from '../components/reports/report.service';
import { NeuronComponent } from '../components/neuron/neuron.component';
import { ThinClientComponent } from '../components/thin-client/thin-client.component';
import { IdleModalComponent } from './modals/idle-modal/idle-modal.component';
import { CommonModalComponent } from './modals/common-modal/common-modal.component';
import { LogoutWarningModalComponent } from './modals/logout-warning-modal/logout-warning-modal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GrpcDemoComponent } from '../components/grpc-demo/grpc-demo.component';

@NgModule({
    declarations: [
        BaseComponent,
        IdleModalComponent,
        CommonModalComponent,
        LogoutWarningModalComponent,
        NeuronComponent,
        ThinClientComponent,
        GrpcDemoComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        NgbDatepickerModule,
        NgCircleProgressModule.forRoot(),
        ApplicationRoutingModule,
        HttpClientModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        ReportService,
    ]
})
export class ApplicationModule { }
