import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentDetailComponent } from './review/document-detail/document-detail.component';
import { SearchComponent } from '../search/search.component';
import { ReferralManagementComponent } from './referral-management.component';

import { AngularSplitModule } from 'angular-split';

const routes: Routes = [

    {
        path: '',
        component: ReferralManagementComponent,

        children: [
            {
                path: '',
                redirectTo: 'review',
                pathMatch: 'full'
            },

            {
                path: 'review',
                loadChildren: () => import('./review/review.module').then(m => m.ReviewModule)
            },
            {
                path: 'document-detail/:id',
                component: DocumentDetailComponent
            }

        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), AngularSplitModule.forRoot() ],
    exports: [RouterModule]
})
export class ReferralManagementRoutingModule { }
