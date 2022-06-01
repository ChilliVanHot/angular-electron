import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxComponent } from './inbox.component';
import { AngularSplitModule } from 'angular-split';

const routes: Routes = [

    {
        path: '',
        component: InboxComponent,

        children: [
            {
                path: '',
                redirectTo: 'chats',
                pathMatch: 'full'
            },
            {
                path: 'alerts',
                loadChildren: () => import('./alerts/alerts.module').then(m => m.AlertsModule)
            },
            {
                path: 'chats',
                loadChildren: () => import('./chats/chats.module').then(m => m.ChatsModule)
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes), AngularSplitModule.forRoot() ],
    exports: [RouterModule]
})
export class InboxRoutingModule { }
