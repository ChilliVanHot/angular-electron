import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { NGXLogger } from 'ngx-logger';

import { MessageService } from './message.service';
import { PrintModalComponent } from '../../application/modals/print-modal/print-modal.component';


@Injectable({
    providedIn: 'root'
})
export class UiService {
  subscription: Subscription;
  modalRef: NgbModalRef;
  private className = 'UiService';
    constructor(
        private logger: NGXLogger,
        private ngZone: NgZone,
        private modalService: NgbModal,
        private messageService: MessageService) {
        this.logger.debug(this.className + '.constructor()');

        this.subscription = this.messageService.getMessage().subscribe(message => {

            switch (message.subject) {

                // case 'pdf':
                //     this.logger.debug(this.className + '.constructor() ===========================================');
                //     this.logger.debug(this.className + 'getMessage - pdf');

                //     this.ngZone.run(() => {
                //         this.pdfSrc = message.text;
                //         this.isLoading = false;
                //     });
                //     break;

                case 'getPrintersResult':
                    this.logger.debug(this.className + '.getMessage - getPrintersResult:', message.text);

                    this.showPrintDialog(JSON.parse(message.text));
                    break;
            }
        });
    }


    showPrintDialog(printerInfo: any) {
        this.logger.debug(this.className + '.showPrintDialog()', printerInfo);

        this.ngZone.run(() => {
            this.modalRef = this.modalService.open(PrintModalComponent);
            this.modalRef.componentInstance.printerList = printerInfo.printerList;
            this.modalRef.componentInstance.selectedPrinter = null;

            this.modalRef.result.then(
                (result) => {
                    this.logger.debug(this.className + '.showPrintDialog() - result', result);

                    const message = {
                        source: printerInfo.source,
                        printer: result
                    };

                    this.messageService.sendMessage('printerSelected', JSON.stringify(message));
                },
                (reason) => {
                    this.logger.debug(this.className + '.showPrintDialog() - CANCEL', reason);
                }
            );
        });
    }




}
