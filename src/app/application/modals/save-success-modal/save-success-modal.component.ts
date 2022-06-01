import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';


@Component({
    selector: 'app-save-success-modal',
    templateUrl: './save-success-modal.component.html',
    styleUrls: ['./save-success-modal.component.scss']
})
export class SaveSuccessModalComponent implements OnInit, OnDestroy {
    private className = 'SaveSuccessModalComponent';


    constructor(private logger: NGXLogger,
                private activeModal: NgbActiveModal) {
        this.logger.debug(this.className + '.constructor()');

    }


    ngOnInit() {
        this.logger.debug(this.className + '.ngOnInit()');

        setTimeout(() => {
            this.activeModal.dismiss('close');
       }, 3000);
    }


    ngOnDestroy() {
        this.logger.debug(this.className + '.ngOnDestroy()');

    }
}
