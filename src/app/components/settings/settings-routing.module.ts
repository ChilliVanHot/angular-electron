import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { AngularSplitModule } from 'angular-split';
import { NeuronComponent } from '../neuron/neuron.component';
import { ThinClientComponent } from '../thin-client/thin-client.component';
import { GrpcDemoComponent } from '../grpc-demo/grpc-demo.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,

        children: [
            {
                path: '',
                redirectTo: 'settings/users',
                pathMatch: 'full',
            },

            {
                path: 'application/neuron-route',
                component: NeuronComponent,
            },
            {
                path: 'application/thin-client-route',
                component: ThinClientComponent,
            },
            {
                path: 'application/grpc-demo',
                component: GrpcDemoComponent,
            },
            // {
            //     path: 'organization',
            //     loadChildren: () => import('../organization/organization.module').then(m => m.OrganizationModule)
            // },
            // {
            //     path: 'users',
            //     loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
            // }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), AngularSplitModule.forRoot()],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
