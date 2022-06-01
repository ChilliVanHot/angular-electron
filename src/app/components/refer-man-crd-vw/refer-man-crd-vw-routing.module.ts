import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferralManagementCardViewComponent } from './refer-man-crd-vw.component';

const routes: Routes = [

    {
        path: '',
        component: ReferralManagementCardViewComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralManagementCardViewRoutingModule { }
