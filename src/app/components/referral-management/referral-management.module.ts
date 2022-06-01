import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule} from '@ngx-translate/core';

import { AngularSplitModule } from 'angular-split';
import { MomentModule } from 'ngx-moment';

import { ReferralManagementRoutingModule } from './referral-management-routing.module';
import { ReferralManagementComponent } from './referral-management.component';


@NgModule({
    declarations: [
        ReferralManagementComponent
    ],
    imports: [
        AngularSplitModule.forRoot(),
        CommonModule,
        ReferralManagementRoutingModule,
        MomentModule,
        TranslateModule
    ]
})
export class ReferralManagementModule { }
