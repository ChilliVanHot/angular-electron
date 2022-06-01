import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-print-modal',
    templateUrl: './print-modal.component.html',
    styleUrls: ['./print-modal.component.scss']
})
export class PrintModalComponent implements OnInit {
    private className = 'PrintModalComponent';

    translation;

    // [ { deviceId: 'Canon_MX490_series', name: 'Canon MX490 series' } ]
    printerList = [];
    selectedPrinter;

    constructor(private logger: NGXLogger,
                private activeModal: NgbActiveModal,
                private translate: TranslateService) {
        this.logger.debug(this.className + '.constructor()');

    }


    ngOnInit() {
        this.logger.debug(this.className + '.ngOnInit()', this.printerList);

        if(this.selectedPrinter == null) {
            this.selectedPrinter = {
                deviceId: '-1',
                name: ''
            }
        }
    }


    doCancel() {
        this.logger.debug(this.className + '.doCancel()');

        this.activeModal.dismiss('cancel');
    }


    doPrint() {
        this.logger.debug(this.className + '.doPrint()', this.selectedPrinter);

        this.activeModal.close(this.selectedPrinter);
    }


}
