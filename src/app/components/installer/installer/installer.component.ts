import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../shared/services/message.service';
import { SaveSuccessModalComponent } from '../../../application/modals/save-success-modal/save-success-modal.component';

import { ElectronEventService } from '../../../_services/electron-event.service';

import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-installer',
    templateUrl: './installer.component.html',
    styleUrls: ['./installer.component.scss']
})
export class InstallerComponent implements OnInit {
  origin = 'update';
  isLoading = false;
  modalRef;
  isEmis = true;
    isTpp = false;
    isVision = false;
    selectedClinicalSystem = 'emis';
    languages = [
      { display: 'English', code: 'en' },
      { display: 'Afrikaans', code: 'af' }
    ];
    selectedLanguage = {
      display: 'Select a language...',
      code: '-1'
    };
    private className = 'InstallerComponent';
    constructor(private logger: NGXLogger,
      private route: ActivatedRoute,
        private ngZone: NgZone,
        private modalService: NgbModal,
        private electronEventService: ElectronEventService,
        private messageService: MessageService,
        private translate: TranslateService) {
        this.logger.debug(this.className + '.constructor()');

        this.route.paramMap.subscribe(params => {
            this.origin = params.get('origin');
            this.logger.debug(this.className + 'ngOnInit() - origin:', this.origin);
        });
    }


    ngOnInit() {
        this.logger.debug(this.className + '.ngOnInit()');
    }


    changeLanguage(newLanguage: any) {
        this.logger.debug(this.className + '.changeLanguage()', newLanguage);

        this.selectedLanguage = newLanguage;
    }


    toggleCS(cs: string) {
        this.logger.debug(this.className + '.toggleCS()', cs);

        this.ngZone.run(() => {

            this.isEmis = false;
            this.isTpp = false;
            this.isVision = false;

            this.selectedClinicalSystem = cs;

            switch (cs) {

                case 'emis':
                    this.isEmis = true;
                    break;

                case 'tpp':
                    this.isTpp = true;
                    break;

                case 'vision':
                    this.isVision = true;
                    break;
            }
        });
    }


    doSubmit(isSetup) {
        this.logger.debug(this.className + '.doSubmit()', isSetup);

        if (isSetup) {
            const params = {
                origin: this.origin,
                clinicalSystem: this.selectedClinicalSystem
            };

            this.messageService.sendMessage('cmdSetupComplete', JSON.stringify(params));
        } else {
            const modalRef = this.modalService.open(SaveSuccessModalComponent);
        }
    }

}
