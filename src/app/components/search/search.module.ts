import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';

import { MomentModule } from 'ngx-moment';
import { SearchRoutingModule } from './search-routing.module';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search.component';


const routes: Routes = [
    {
        path: '',
        component: MainComponent
    }
];
@NgModule({
    declarations: [
        MainComponent,
        SearchComponent
    ],
    imports: [

        SearchRoutingModule,
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
export class SearchModule { }
