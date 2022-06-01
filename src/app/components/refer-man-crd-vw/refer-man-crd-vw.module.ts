import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';

import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { ReferralManagementCardViewRoutingModule } from './refer-man-crd-vw-routing.module';
import { ReferralManagementCardViewComponent } from './refer-man-crd-vw.component';
import { MomentModule } from 'ngx-moment';
const routes: Routes = [
    {
        path: '',
        component: ReferralManagementCardViewComponent
    }
];

@NgModule({
  declarations: [ReferralManagementCardViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReferralManagementCardViewRoutingModule,
    NgbModule,
    NgbDatepickerModule,
    FormsModule,
    MomentModule,
    TranslateModule
  ]
})
export class ReferMngntCrdViewModule { }
