import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSplitModule } from 'angular-split';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule} from '@ngx-translate/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportViewComponent } from './report-view/report-view.component';
import { MainComponent } from './main/main.component';
import { ReportsComponent } from './reports.component';

@NgModule({
    declarations: [
        ReportViewComponent,
        MainComponent,
        ReportsComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        AngularSplitModule.forRoot(),
        ReportsRoutingModule,
        TranslateModule
    ]
})
export class ReportsModule { }
