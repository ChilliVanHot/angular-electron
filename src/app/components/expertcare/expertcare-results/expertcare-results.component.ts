import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { MessageService } from '../../../shared/services/message.service';
import { UserService } from '../../user/user.service';
import { PatientService } from '../../patient/patient.service';
import { ExpertcareService } from '../expertcare.service';

import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-expertcare-results',
    templateUrl: './expertcare-results.component.html',
    styleUrls: ['./expertcare-results.component.scss']
})
export class ExpertcareResultsComponent implements OnInit {
  translation;
  subscription: Subscription;
  modalRef: NgbModalRef;
  pdfSrc;
  public env = environment;
  public url: string;
  public isLoading: boolean;
  public isViewHidden = false;
  public expertcareResults;
  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  private className = 'ExpertcareResultsComponent';
  constructor(
    private ngZone: NgZone,
        private logger: NGXLogger,
        private router: Router,
        private messageService: MessageService,
        public userService: UserService,
        public patientService: PatientService,
        public expertcareService: ExpertcareService) {
        this.logger.debug(this.className + '.constructor()');

        this.subscription = this.messageService.getMessage().subscribe(message => {

            switch (message.subject) {

                case 'pdf':
                    this.logger.debug(this.className + '.getMessage - pdf');

                    this.ngZone.run(() => {
                        this.pdfSrc = message.text;
                        this.isLoading = false;
                    });
                    break;
            }
        });
    }


    ngOnInit() {
        this.logger.debug(this.className + '.ngOnInit()');

        this.isLoading = true;
        this.expertcareResults = this.expertcareService.messageContent.data;
    }


    doDone() {
        this.logger.debug(this.className + '.doDone()');

        this.router.navigate(['/application']);
        this.messageService.sendMessage('cmdUpdateMainwindow', 'reset');
    }


    doReview() {
        this.logger.debug(this.className + '.doReview()');

        this.expertcareService.isReloaded = true;
        this.patientService.patientXML = null;
        this.messageService.sendMessage('loadPatientRecord', '');
        this.messageService.sendMessage('cmdUpdateMainwindow', 'reset');
        this.router.navigate(['/application/expertcare']);
    }


    doGetPrinters() {
        this.logger.debug(this.className + '.doGetPrinters()');

        this.messageService.sendMessage('getPrinters', 'expertcareSummary');
    }


    doSaveFile() {
        this.logger.debug(this.className + '.doGetFile()');

        this.expertcareService.saveFile();
    }


    doSaveToPatientRecord() {
        this.logger.debug(this.className + '.onSaveToPatientRecord()');

        this.expertcareService.saveToPatientRecord();
    }

    // onFileSelected() {
    //     this.logger.debug(this.className + '.onFileSelected()');

    //     let $img: any = document.querySelector('#file');

    //     if (typeof (FileReader) !== 'undefined') {
    //         let reader = new FileReader();

    //         reader.onload = (e: any) => {
    //             console.log('e.target.result');
    //             console.log(e.target.result);
    //             this.pdfSrc = e.target.result;
    //         };

    //         console.log($img.files[0]);
    //         reader.readAsArrayBuffer($img.files[0]);
    //     }

    // }
}
