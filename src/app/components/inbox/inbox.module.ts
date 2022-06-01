import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule} from '@ngx-translate/core';

import { AngularSplitModule } from 'angular-split';
import { MomentModule } from 'ngx-moment';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';


@NgModule({
    declarations: [
        InboxComponent
    ],
    imports: [
        AngularSplitModule.forRoot(),
        CommonModule,
        InboxRoutingModule,
        MomentModule,
        TranslateModule
    ]
})
export class InboxModule { }
