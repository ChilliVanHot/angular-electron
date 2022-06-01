import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrpcDemoComponent } from '../components/grpc-demo/grpc-demo.component';

import { BaseComponent } from './base/base.component';

const routes: Routes = [

    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },

            {
                path: 'splash',
                loadChildren: () => import('./splash/splash.module').then(m => m.SplashModule),
                data: {
                    pageTitle: ''
                }
            },
            {
                path: 'home',
                loadChildren: () => import('../components/home/home.module').then(m => m.HomeModule),
                data: {
                    pageTitle: 'PAGE_TITLE_HOME'
                }
            },
            // Inbox
            {
                path: 'inbox',
                loadChildren: () => import('../components/inbox/inbox.module').then(m => m.InboxModule),
                data: {
                    pageTitle: 'PAGE_TITLE_INBOX'
                }
            },
            {
                path: 'patient',
                loadChildren: () => import('../components/patient/patient.module').then(m => m.PatientModule),
                data: {
                    pageTitle: 'PAGE_TITLE_PATIENT'
                }
            },
            {
                path: 'settings',
                loadChildren: () => import('../components/settings/settings.module').then(m => m.SettingsModule),
                data: {
                    pageTitle: 'PAGE_TITLE_SETTINGS'
                }
            },
            {
                path: 'grpc-demo',
                component: GrpcDemoComponent
            },
            // {
            //     path: 'audit',
            //     loadChildren: () => import('@components/audit/audit.module').then(m => m.AuditModule)
            // },

            // ExpertCare
            {
                path: 'expertcare',
                loadChildren: () => import('../components/expertcare/expertcare.module').then(m => m.ExpertcareModule),
                data: {
                    pageTitle: 'PAGE_TITLE_EXPERTCARE'
                }
            },

            // BP
            // {
            //     path: 'bp',
            //     component: BPComponent
            // },


            // Search Provider
            // {
            //     path: 'search-provider',
            //     component: SearchProviderComponent
            // },

            // Installer
            {
                path: 'installer/:origin',
                loadChildren: () => import('../components/installer/installer.module').then(m => m.InstallerModule),
                data: {
                    pageTitle:'PAGE_TITLE_INSTALLER'
                }
            },

            // Reports
            {
                path: 'reports',
                loadChildren: () => import('../components/reports/reports.module').then(m => m.ReportsModule),
                data: {
                    pageTitle:'PAGE_TITLE_REPORTS'
                }
            },
            // Referral Management
            {
                path: 'referral-management',
    loadChildren: () => import('../components/referral-management/referral-management.module').then(m => m.ReferralManagementModule),
                data: {
                    pageTitle:'PAGE_TITLE_REFERRAL_MANAGEMENT'
                }
            },

            // Referral Management Card View
            {
                path: 'refer-man-crd-vw',
loadChildren: () => import('../components/refer-man-crd-vw/refer-man-crd-vw.module').then(m => m.ReferMngntCrdViewModule),
                data: {
                    pageTitle:'PAGE_TITLE_REFERRAL_MANAGEMENT'
                }
            },
            // Referral Management - Search
            {
                path: 'search',
                loadChildren: () => import('../components/search/search.module').then(m => m.SearchModule),
                data: {
                    pageTitle: 'PAGE_TITLE_REFERRAL_SEARCH'
                }
            },

            // Feedback
            {
                path: 'feedback',
                loadChildren: () => import('../components/feedback/feedback.module').then(m => m.FeedbackModule),
                data: {
                    pageTitle: 'PAGE_TITLE_FEEDBACK'
                }
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule { }
