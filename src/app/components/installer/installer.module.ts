import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';
import { MomentModule } from 'ngx-moment';
import { TranslateModule} from '@ngx-translate/core';
import { SaveSuccessModalComponent } from '../../application/modals/save-success-modal/save-success-modal.component';

import { InstallerRoutingModule } from './installer-routing.module';
import { InstallerComponent } from './installer/installer.component';

@NgModule({
    declarations: [
        InstallerComponent,
        SaveSuccessModalComponent
    ],
    imports: [
        CommonModule,
        InstallerRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularSplitModule.forRoot(),
        ReactiveFormsModule,
        NgbModule,
        MomentModule,
        TranslateModule
    ]
})
export class InstallerModule { }
