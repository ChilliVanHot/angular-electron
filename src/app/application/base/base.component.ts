import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { environment } from '../../../environments/environment';

import { MessageService } from '../../shared/services/message.service';
import { IdleModalComponent } from '../modals/idle-modal/idle-modal.component';
import { LogoutWarningModalComponent } from '../modals/logout-warning-modal/logout-warning-modal.component';
import { UserService } from '../../components/user/user.service';
import { VersionService } from '../../shared/services/version.service';
import { PatientService } from '../../components/patient/patient.service';
import { ExpertcareService } from '../../components/expertcare/expertcare.service';
import { UiService } from '../../shared/services/ui.service';


@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, OnDestroy {
  env = environment;
  subscription: Subscription;
  navigationRouterSubscription: Subscription;
  currentRouterURL: string;
  idleState = 'Not started.';
  timedOut = false;
    downloadPercentage = 100;
    isSideMenuHidden = environment.app.isSideMenuHidden;
    isPatient = false;
    isEmis = true;
    isTpp = false;
    isVision = false;
    isActive = false;
    isViewHidden = false;
    isUserVisible = true;
    isIdleModalVisible = false;
    modalRef;
    pageTitle: string;
    showVersion = false;
    eCProdVer = '';
    eCProdVerText = '';
    expertCareService: ExpertcareService;
    private className = 'BaseComponent';


    constructor(
      private ngZone: NgZone,
      private router: Router,
      private route: ActivatedRoute,
        private logger: NGXLogger,
        private modalService: NgbModal,
        private idle: Idle,
        private messageService: MessageService,
        public patientService: PatientService,
        private versionService: VersionService,
        public userService: UserService,
        private uiService: UiService,
        public _expertCareService: ExpertcareService
        // private communicationService: CommunicationService,
        // private languageService: LanguageService
    ) {
        this.logger.debug('**********************************************');
        this.logger.debug('**********************************************');
        this.logger.debug('**********************************************');
        this.logger.debug('******************** MAIN ********************');
        this.logger.debug('**********************************************');
        this.logger.debug('**********************************************');
        this.logger.debug('**********************************************');
        this.expertCareService = _expertCareService;
        this.logger.debug(this.className + '.constructor()');

        if(this.patientService.patient.registration.familyName !== '') {
            this.isPatient = true;
        }

        // Enable/Disable Idle functionality when navigating to and from the exprtcare iframe
        this.navigationRouterSubscription = this.router.events.subscribe((event: NavigationEvent) => {
            if(event instanceof NavigationStart) {
                if(event.url.includes('expertcare')) {
                    this.setIdle(99999, 99999);
                    console.log( 'christopher----------999999expertcare999999----------999-->');
                }

                if(this.currentRouterURL.includes('expertcare')) {
                    console.log( 'christopher----------8888888expertcare888888----------999-->');
                    this.setIdle(environment.app.idle.time, environment.app.idle.timeout);
                }
            } else if(event instanceof NavigationEnd) {
                this.currentRouterURL = event.url;
                this.pageTitle = this.route.snapshot.firstChild.data.pageTitle;
                console.log('ActivatedRoute', event.url, this.route.snapshot.firstChild.data.pageTitle);
            }
        });

        this.subscription = this.messageService.getMessage().subscribe(message => {

            switch (message.subject) {

                case 'heartbeat':
                    this.logger.debug(this.className + '.getMessage:', message.subject, message.text);

                    this.ngZone.run(() => {

/*{"type":"heartbeat","message":"Server is alive.","data":{"atTime":"2020-10-22T10:09:54.4892956+01:00"
,"isIntegrationActive":false,"statusID":5,"onVersion":"1.0.0.0"}}
*/
                        this.isActive = message.text.data.isIntegrationActive;

                        if(!message.text.data.isIntegrationActive && !this.router.url.includes('installer')) {
                            this.messageService.sendMessage('closeMainWindow', '');
                        }
                    });
                    break;

                case 'toggleMenu':
                    this.logger.debug(this.className + '.getMessage:', message.subject, message.text);

                    this.ngZone.run(() => {
                        this.isSideMenuHidden = !this.isSideMenuHidden;
                    });
                    break;

                case 'cmdViewChange':
                    this.logger.debug(this.className + '.getMessage:', message.subject, message.text);

                    this.ngZone.run(() => {
                        this.router.navigate(['/application/' + message.text]);
                    });
                    break;

                case 'hideView':
                    this.logger.debug(this.className + '.getMessage:', message.subject, message.text);

                    this.isViewHidden = !this.isViewHidden;
                    this.showHideView(this.isViewHidden);
                    break;

                case 'idleReset':
                    this.logger.debug(this.className + '.getMessage:', message.subject, message.text);

                    this.setIdle(environment.app.idle.time, environment.app.idle.timeout);
                    break;

                case 'idleWarning':
                    this.logger.debug(this.className + '.getMessage:', message.subject, message.text);

                    this.setIdle(1, 10);
                    break;

                case 'logoutWarning':
                    this.logger.debug(this.className + '.getMessage:', message.subject, message.text);

                    this.showLogoutWarningModal();
                    break;

                case 'response-patient-demographics':
                    this.logger.debug('>>>>>>>>>>>>>>>>>>>>>>CHRISTOPHER response-patient-demographics'+ message.text.data.succeeded);
                  //  if (message.text.data.succeeded) { // a patient is selected
                        this.logger.debug(this.className + '.getMessage:', message.subject, message.text);

                        if(this.router.url.includes('expertcare')) {
                            this.messageService.sendMessage('loadPatientRecord', '');
                            //this.router.navigate(['/application/splash']);
                        }
                      //  this.noPatientDetails = false;
                  //  } else {
                      //  alert('nodata')
                     //   this.noPatientDetails = true;
                       // this.patientService.patient.registration.familyName = '';
                      //  this.patientService.patient.registration.nhsNumber = '';
                  //  }
                    break;

                case 'response-patient-current':
                    this.logger.debug(this.className + '.getMessage:', message.subject, message.text);
                    break;
                case 'updater':
                    this.logger.debug(this.className + '.getMessage:', message.subject, message.text);

                    this.ngZone.run(() => {
                        this.downloadPercentage = message.text.progress;
                    });

                    break;
                // case 'idleExecuted':
                //     this.ngZone.run(() => {
                //         this.router.navigate(['/application/' + message.text]);
                //     });
                //     break;
            }
        });

        this.setIdle(environment.app.idle.time, environment.app.idle.timeout);
    }
    geteCProdVer() {
      this.eCProdVer = (this.expertCareService.productVersion === undefined) ? 'Loading...' : this.expertCareService.productVersion;
  }

  toggleShowVersionNo() {
      if(this.currentRouterURL.includes('expertcare')) {
          this.geteCProdVer();
          this.showVersion = !this.showVersion;
      }
  }

  quitMainWindow() {
      console.log('going to send message');
      this.messageService.sendMessage('close', '');
  }
    ngOnInit() {
        this.logger.debug(this.className + '.ngOnInit()');
    }

    ngOnDestroy() {
        this.logger.debug(this.className + '.ngOnDestroy()');

        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
        this.navigationRouterSubscription.unsubscribe();
    }

    navigateToExpertCare() {
        this.messageService.sendMessage('loadPatientRecord', '');

    this.messageService.sendMessage('cmdIdleReset', '');
    this.messageService.sendMessage('openMainWindow', 'expertcare');
    }
    setIdle(time: number, timeout: number) {
        this.logger.debug(this.className + '.setIdle()', time, timeout);

        // sets an idle timeout of [time] seconds, for testing purposes.
        this.idle.setIdle(time);
        // sets a timeout period of [timeout] seconds. after [timeout] seconds of inactivity, the user will be considered timed out.
        this.idle.setTimeout(timeout);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        this.idle.onIdleEnd.subscribe(() => {
            this.idleState = 'No longer idle.';
            this.logger.debug(this.className + '.setIdle() - idleState', this.idleState);
        });

        this.idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.timedOut = true;
            this.logger.debug(this.className + '.setIdle() - idleState', this.idleState);
            this.messageService.sendMessage('idleTimedOut', '');
            this.modalRef.close('timedOut');
        });

        this.idle.onIdleStart.subscribe(() => {
            this.idleState = 'You\'ve gone idle!';
            this.logger.debug(this.className + '.setIdle() - idleState', this.idleState);
        });

        this.idle.onTimeoutWarning.subscribe((countdown) => {
            this.idleState = 'You will time out in ' + countdown + ' seconds!';

            this.messageService.sendMessage('idleCountDown', countdown.toString());
            this.logger.debug(this.className + '.setIdle() - idleState', this.idleState);

            if(!this.isIdleModalVisible) {
                this.isIdleModalVisible = true;

                this.showIdleModal();
            }
        });

        this.reset();


    }


    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
        this.isIdleModalVisible = false;
    }


    showHideView(isvisible: boolean) {

        if (isvisible) {
            document.getElementById('rootbody').style.opacity = '0.05';
        }
        else {
            document.getElementById('rootbody').style.opacity = '1';
        }
    }


    showUser() {
        if (this.isActive) { //isActive refers to when the Websocket can actually communicate with with the clinical system
            this.isUserVisible = !this.isUserVisible;
            setTimeout(() => {
                this.isUserVisible = true;
            }, 10000);
        }
    }


    showIdleModal() {
        this.logger.debug(this.className + '.showIdleModal()');

        this.modalRef = this.modalService.open(IdleModalComponent);
        this.modalRef.result.then(
            (result) => {

                if (result !== 'timedOut') {
                    this.messageService.sendMessage('idleReset', '');
                }
            },
            (reason) => {
                console.log('reason', reason);
                this.messageService.sendMessage('idleReset', '');
            }
        );
    }


    showModal(title: string, content: string) {
        this.logger.debug(this.className + '.showModal()');

        const modalRef = this.modalService.open(IdleModalComponent);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.content = content;
        modalRef.result.then(
            (result) => {
                console.log('result', result);
                //this.modalCloseResult = `Closed with: ${result}`;
            },
            (reason) => {
                console.log('reason', reason);
                console.log(this.getDismissReason(reason));
            }
        );
    }


    showLogoutWarningModal() {
        this.logger.debug(this.className + '.showLogoutWarningModal()', this.router.url);

        if(this.router.url.includes('application/installer')) {
            return;
        }

        this.ngZone.run(() => {
            this.modalRef = this.modalService.open(LogoutWarningModalComponent);
        });
    }


    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
