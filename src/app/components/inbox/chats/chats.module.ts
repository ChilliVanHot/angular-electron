import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';

import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { AngularSplitModule } from 'angular-split';
import { MomentModule } from 'ngx-moment';


const routes: Routes = [
    {
        path: '',
        component: MainComponent
    }
];


@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AngularSplitModule.forRoot(),
        NgbModule,
        NgbDatepickerModule,
        FormsModule,
        MomentModule,
        TranslateModule
    ]
})
export class ChatsModule { }
