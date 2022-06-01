import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-common-modal',
    templateUrl: './common-modal.component.html',
    styleUrls: ['./common-modal.component.scss']
})
export class CommonModalComponent implements OnInit {
  @Input() title;
  @Input() content;
  env = environment;
  private functionName = 'CommonModalComponent';

    constructor(private logger: NGXLogger,
                public activeModal: NgbActiveModal,
                private translate: TranslateService) {
        this.logger.debug(this.functionName + '.constructor()');

    }


    ngOnInit() {
        this.logger.debug(this.functionName + '.ngOnInit()');
    }

}
