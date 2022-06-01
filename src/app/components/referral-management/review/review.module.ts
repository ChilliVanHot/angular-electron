import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
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
        ReactiveFormsModule,
        MomentModule,
        TranslateModule
    ]
})
export class ReviewModule { }
