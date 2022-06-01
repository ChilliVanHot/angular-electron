import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule} from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AngularSplitModule } from 'angular-split';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SettingsComponent,
    ],
    imports: [
        AngularSplitModule.forRoot(),
      //  RouterModule.forChild(routes),
        CommonModule,
        SettingsRoutingModule,
        HttpClientModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SettingsModule { }
