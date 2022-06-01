import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { VersionService } from '../../shared/services/version.service';
import { MessageService } from '../../shared/services/message.service';
import { PatientService } from '../patient/patient.service';
import { UserService } from '../user/user.service';



@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  subscription: Subscription;
    isOpen = false;
    isActive = false;
    downloadPercentage = 100;
    patientService: PatientService;
    errorToolTip = '';
    errorCount = 0;
    isStarting = true;
    private className = 'ToolbarComponent';
    constructor(private ngZone: NgZone,
                private logger: NGXLogger,
                private messageService: MessageService,
                private versionService: VersionService,
                private _patientService: PatientService,
                private userService: UserService) {
                  this.logger.debug('****************8chris');
                  this.logger.debug('**********************************************');
                  this.logger.debug('**********************************************');
        this.logger.debug('**********************************************');
        this.logger.debug('****************** TOOLBAR *******************');
        this.logger.debug('**********************************************');
        this.logger.debug('**********************************************');
        this.logger.debug('**********************************************');

        this.logger.debug('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        this.logger.debug(this.className + '.constructor()');
        this.logger.debug('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

        this.patientService = _patientService;
        this.subscription = this.messageService.getMessage().subscribe(message => {
            this.logger.debug(this.className + 'getMessage:', message.subject);

            switch (message.subject) {
                case 'app-starting':
                    this.logger.debug(this.className + 'getMessage - app-starting:', message.text);
                    break;
                  //  this.isStarting = true;
                case 'disconnection':
                    this.logger.debug(this.className + 'getMessage - disconnection:', message.text);
                    this.ngZone.run(() => {
                        /*{"type":"heartbeat","message":"Server is alive.","data":{"atTime":
                        "2020-10-22T10:09:54.4892956+01:00","isIntegrationActive":false,"sta
                        tusID":5,"onVersion":"1.0.0.0"}}
                        */
                        this.isActive = false;

                        this.updateErrorToolTip('Neuron has disconnected');
                    });
                    break;
                case 'heartbeat':
                    this.logger.debug(this.className + 'getMessage - heartbeat:', message.text);
                    this.ngZone.run(() => {
                        /*{"type":"heartbeat","message":"Server is alive.","data":{"atTime":"2020-10-22T10:09
                        :54.4892956+01:00","isIntegrationActive":false,"statusID":5,"onVersion":"1.0.0.0"}}
                        */
                        this.isActive = message.text.data.isIntegrationActive;
                        if (!this.isActive) {
                            this.isActive = false;
                           // this.errorToolTip = message.text.message ;
                            this.updateErrorToolTip(message.text.message);
                        }
                    });
                    break;

                case 'connection':
                    this.logger.debug(this.className + 'getMessage - connection:', message.text);
                    this.isStarting = false;
                    if(message.text.data != null && (message.text.data.integrationState !== undefined)
                      && message.text.data.status !== 'error') {
                        this.ngZone.run(() => {
                            this.isActive = true;
                        });
                    } else {
                        this.isActive = false;
                        //this.errorToolTip = message.text.message ;
                        this.updateErrorToolTip(message.text.message);
                    }
                    break;

                case 'updater':
                    this.logger.debug(this.className + 'getMessage - updater:', message.text);

                    this.ngZone.run(() => {
                        this.downloadPercentage = message.text.progress;
                    });

                    break;
                case 'offLine':
                    this.ngZone.run(() => {
                        this.isActive = false;
                        this.updateErrorToolTip('Neuron is Offline');
                    });
                    break;
            }
        });
// example
// in the render process..
// const tt = require('electron-tooltip')
// tt({
//   position: 'bottom',
//   width: 200,
//   style: {
//     backgroundColor: '#f2f3f4',
//     borderRadius: '4px'
//   },
//   customContent: this.errorToolTip,
// })
        this.versionService.init();
        this.userService.init();
    }

    updateErrorToolTip(tooltip: any) {
        if (this.errorCount < 3) {
            if (this.errorToolTip.indexOf(tooltip) === -1) {
                    this.errorToolTip += tooltip +' ';
            } else {
                this.errorToolTip += tooltip;
            }
            this.errorCount++;
        }
    }

    ngOnInit() {
    }


    ngOnDestroy() {
        this.logger.debug(this.className + '.ngOnDestroy()');

        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }


    toggleToolbar() {
        this.logger.debug(this.className + '.toggleToolbar()', this.isOpen);
        if (!this.isActive ) {
            if (this.errorToolTip  !== '') {
                let thisMessage = '';
                let title = '';
                if (this.errorToolTip !== 'Server is alive.') {
                    title = 'Neuron Disconnected';
                    thisMessage = this.errorToolTip + '. Could not connect to Neuron; please ensure it is running';
                } else {
                    title = 'CLINICAL SYSTEM: Emis Disconnected';
                    thisMessage = 'Neuron ' + this.errorToolTip + '. Could not connect to the clinical system; please ensure it is running';
                }
                this.messageService.sendMessage('cmdShowModal', '{"title": "'+title+'", "message": "'+thisMessage+'"}');
            } else {
                this.messageService.sendMessage('cmdShowModal',
                '{"title": "Clinical system error", "message":"Please be patient while the system retrieves the specific error."}' );
            }
            //}
        }
        if (!this.isStarting && this.isActive) {
        this.isOpen = !this.isOpen;
        this.messageService.sendMessage('cmdToggleToolbar', '');
        }
    }

    hideToolbar() {
        this.messageService.sendMessage('hideToolbar', '');
    }

    openMainWindow(view: string) {
        this.logger.debug(this.className + '.openMainWindow() - isLocked', this.userService.isLocked);
        this.logger.debug(this.className + '.openMainWindow() - user', this.userService.user);

        if(view !== 'kill'
            && view !== 'installer/update'
            && (this.userService.user.userName === '' || this.userService.isLocked )
            && view !== 'home') {

            this.messageService.sendMessage('cmdShowModal',
            '{"title": "Notification", "message": "User not logged in, please log in via your Clinical System!"}');

            return false;
        }

        if(view === 'expertcare') {

            if(this.patientService.patient.registration.nhsNumber === '') {
                this.messageService.sendMessage('cmdShowModal',
                '{"title": "Notification", "message": "No Patient selected, please select a patient in your Clinical System!"}');

                return false;
            }

            this.messageService.sendMessage('loadPatientRecord', '');
        }

        this.messageService.sendMessage('cmdIdleReset', '');
        this.messageService.sendMessage('openMainWindow', view);
    }

}
