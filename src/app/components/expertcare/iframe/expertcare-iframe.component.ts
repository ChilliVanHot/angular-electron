import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { MessageService } from '../../../shared/services/message.service';
import { PatientService } from '../../patient/patient.service';
import { UserService } from '../../user/user.service';
import { ExpertcareService } from '../expertcare.service';

import { environment } from '../../../../environments/environment';



@Component({
    selector: 'app-expertcare-iframe',
    templateUrl: './expertcare-iframe.component.html',
    styleUrls: ['./expertcare-iframe.component.scss']
})
export class ExpertcareIframeComponent implements OnInit, OnDestroy {
  translation;
  subscription: Subscription;
  public env = environment;
  public url: string;
  public isLoading = true;
  private className = 'ExpertcareIframeComponent';

    @HostListener('window:message', ['$event'])
    onMessage(e) {
        this.logger.debug(this.className + '.onMessage()', e);

        // TODO: parameterize - https://pcptest.dxs-systems.com
        // if (e.origin != 'http://localhost:5000') {
        //     return false;
        // }

        const message = JSON.parse(e.data);
        console.log('message', message);

        switch (message.name) {
            case 'timeoutWarning':
                this.messageService.sendMessage('idleWarning', '');
                break;

            case 'timeoutExecuted':
                this.messageService.sendMessage('idleExecuted', '');
                break;

            case 'expertcare-medicine-change':
                this.expertcareService.setMessage(message);

                if(message.destination === 'print') {
                    this.doGetPrinters();
                }
                else if(message.destination === 'save') {
                    this.doSaveFile();
                }
                else if(message.destination === 'pdf') {
                    this.doSaveFile();
                }
                else if(message.destination === 'complete') {
                    this.doComplete();
                }
                break;
            case 'expertcare-version':
                this.doSeteCProdVer(message.data);
                break;
            default:
                break;
        }
    }


    constructor(private logger: NGXLogger,
                private router: Router,
                private messageService: MessageService,
                private patientService: PatientService,
                public userService: UserService,
                private expertcareService: ExpertcareService) {
        this.logger.debug(this.className + '.constructor()', this.env.app.urlExpertCareUI);

        if(this.patientService.patientXML != null) {
            console.log('PERFORMANCE TRACKING: sendPatientXmlToExpertCare() REQUEST -- this.patientService.patientXML != null');

            this.expertcareService.sendPatientXmlToExpertCare('emis', this.userService.user.locationCode, this.userService.user.userName).subscribe(
                data => {
                    console.log('PERFORMANCE TRACKING: sendPatientXmlToExpertCare() RESPONSE');
                    console.log('Response from ExpertCare: ', data);

                    this.expertcareService.currentToken = data.token.trim();
                    this.doLoad();
                },
                error => {
                    console.log(error);
                    //alert(error);
                }
            );
        }

        this.subscription = this.messageService.getMessage().subscribe(message => {
            console.log(this.className + '.messageService.getMessage()', message.subject);

            switch (message.subject) {
                case 'patientCareRecordLoaded':
                    console.log('PERFORMANCE TRACKING: sendPatientXmlToExpertCare() REQUEST -- patientCareRecordLoaded');
                    this.isLoading = true;
                    this.expertcareService.sendPatientXmlToExpertCare('emis', this.userService.user.locationCode, this.userService.user.userName).subscribe(
                        data => {
                            console.log('PERFORMANCE TRACKING: sendPatientXmlToExpertCare() RESPONSE');
                            console.log('Response from ExpertCare: ', data);

                            this.expertcareService.currentToken = data.token.trim();
                            this.doLoad();
                        },
                        error => {
                            console.log(error);
                            //alert(error);
                        }
                    );
                    break;

                case 'patientChanged':
                case 'loadPatientRecord':
                    this.doLoading();
                    break;

                case 'idleReset':
                    this.doIdleReset();
                    break;

                //TODO: need to remove this in future
                case 'showSummary':
                    // this.showSummary();
                    break;
                default:
                    this.isLoading = false;
                    break;
            }
        });
    }


    ngOnInit() {
        this.logger.debug(this.className + '.ngOnInit()');

      //  this.doLoading();
    }


    ngOnDestroy() {
        this.logger.debug(this.className + '.ngOnDestroy()');

        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    /**
     * When the iFrame is loaded this function will change the Opacity and remove the loading message/spinner
     */
    doLoading() {
        this.logger.debug(this.className + '.doLoading()');

        this.isLoading = true;
         document.documentElement.style.setProperty(`--opacity`, '0.05');
    }


    isWarningVisible() {
        return !this.isLoading && this.patientService.patient.registration.nhsNumber === '';
    }

    isLoadingVisible() {
        return this.patientService.loadingPatient;
    }


    isIframeVisible() {
        return !this.isLoading && this.patientService.patient.registration.nhsNumber !== '';
    }

    /**
     * When the iFrame is loaded this function will change the Opacity and remove the loading message/spinner
     */
    doLoaded() {
        this.logger.debug(this.className + '.doLoaded()');
        console.log('PERFORMANCE TRACKING: requestExpertCareIframe() LOADED');

        this.isLoading = false;
        document.documentElement.style.setProperty(`--opacity`, '1');
    }


    doIdleReset() {
        this.logger.debug(this.className + '.doIdleReset()');
    }


    /**
     * Loads the iFrame using the token that was returned from the EC backend POST
     */
    doLoad() {
        this.logger.debug(this.className + '.doLoad()');
        console.log('PERFORMANCE TRACKING: requestExpertCareIframe() REQUEST');

        this.url = this.env.app.urlExpertCareUI + '?origin=axon&token=' + this.expertcareService.currentToken;

        if(this.expertcareService.isReloaded) {
            this.url += '&nextPage=prescribingRecommendations';
            this.expertcareService.isReloaded = false;
        }
        this.logger.debug('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        this.logger.debug('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        this.logger.debug('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        this.logger.debug(this.className + '.doLoad()', this.url);

        this.isLoading = false;
        document.documentElement.style.setProperty(`--opacity`, '0.05');
    }


    doGetPrinters() {
        this.logger.debug(this.className + '.doGetPrinters()');

        this.messageService.sendMessage('getPrinters', 'expertcareWebview');
    }


    doSaveFile() {
        this.logger.debug(this.className + '.doGetFile()');

        this.expertcareService.saveFile();
    }


    doComplete() {
        this.logger.debug(this.className + '.doComplete()');

        const windowProps = {
            width: 700,
            height: 1200
        }
        this.router.navigate(['/expertcare-results']);

        this.messageService.sendMessage('cmdUpdateMainwindow', JSON.stringify(windowProps));
    }

    doSeteCProdVer(expertCareProduct) {
        this.logger.debug(this.className + '.doSeteCProdVer()'+expertCareProduct);
        this.expertcareService.productVersion = expertCareProduct;

    }

}
