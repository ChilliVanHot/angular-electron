import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Subscription } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import { MessageService } from '../shared/services/message.service';
//'@shared/services/message.service';


@Injectable({
  providedIn: 'root'
})
export class ElectronEventService {
    subscription: Subscription;
    private functionName = 'ElectronEventService';


    constructor(private logger: NGXLogger,
                private electronService: ElectronService,
                private messageService: MessageService) {
        this.logger.debug('TEST2' + this.functionName + '.constructor()');

        this.subscription = this.messageService.getMessage().subscribe(message => {
            //this.logger.debug(this.functionName + 'getMessage:', message);

            /**
             * Messaging TO main process
             */
            if (this.electronService.isElectronApp) {
                this.logger.debug('TEST3.switch');
                switch (message.subject) {
                    case 'close':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'openMainWindow':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'closeMainWindow':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'cmdToggleToolbar':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'cmdSetupComplete':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'cmdStartThinClient':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'cmdIdleReset':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'cmdUpdateMainwindow':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'cmdShowModal':
                        this.renderTheMessage(message.subject, message.string);
                        break;

                    case 'requestPatientCurrent':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'requestPatientCareRecord':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'idleTimedOut':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'getPrinters':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'pdfPrint':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'pdfSaveAs':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'pdfSaveToPatientRecord':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'get-default-config-settings':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'requestDefaultSettings':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'cmdSaveSettings':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'cmdSaveThinClientSettings':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'getHostInfo':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'hideToolbar':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    case 'doUpgrade':
                        this.renderTheMessage(message.subject, message.string);
                        break;
                    default:
                        break;
                    }
                }
        });


        /**
         * Messaging FROM main process
         */
        if (this.electronService.isElectronApp) {
            this.logger.debug(this.functionName + '.constructor() - ELECTRON');


            this.electronService.ipcRenderer.on('idleReset', (e, args) => {
                //this.logger.debug(this.functionName + ' -> idleReset', args);

                this.messageService.sendMessage('idleReset', args);
            });



            this.electronService.ipcRenderer.on('connection', (e, args) => {
                //this.logger.debug(this.functionName + ' -> connection', args);

                this.messageService.sendMessage('connection', args);
            });

            this.electronService.ipcRenderer.on('notification-connection', (e, args) => {
                //this.logger.debug(this.functionName + ' -> notification-connection', args);

                this.messageService.sendMessage('notification-connection', args);
            });

            this.electronService.ipcRenderer.on('notification-locking', (e, args) => {
                //this.logger.debug(this.functionName + ' -> notification-locking', args);

                this.messageService.sendMessage('notification-locking', args);
            });

            this.electronService.ipcRenderer.on('heartbeat', (e, args) => {
                //this.logger.debug(this.functionName + ' -> heartbeat', args);

                this.messageService.sendMessage('heartbeat', args);
            });


            // this.electronService.ipcRenderer.on('message', (e, args) => {
            //     this.logger.debug(this.functionName + ' -> message', args);

            //     this.messageService.sendMessage('message', args);
            // });


            this.electronService.ipcRenderer.on('hideView', (e, args) => {
                //this.logger.debug(this.functionName + ' -> hideView', args);

                this.messageService.sendMessage('hideView', 'Message from Home Component to App Component!');
            });

            this.electronService.ipcRenderer.on('toggleMenu', (e, args) => {
                //this.logger.debug(this.functionName + ' -> menu', args);

                this.messageService.sendMessage('toggleMenu', 'Message from Home Component to App Component!');
            });

            this.electronService.ipcRenderer.on('cmdViewChange', (e, args) => {
                //this.logger.debug(this.functionName + ' -> cmdViewChange', args);

                this.messageService.sendMessage('cmdViewChange', args);
            });

            this.electronService.ipcRenderer.on('showSummary', (e, args) => {
                //this.logger.debug(this.functionName + ' -> cmdViewChange', args);

                this.messageService.sendMessage('showSummary', args);
            });

            this.electronService.ipcRenderer.on('get-default-config-settings', (e, args) => {
                this.messageService.sendMessage('get-default-config-settings', args);
            });
            this.electronService.ipcRenderer.on('response-patient-current', (e, args) => {
                //this.logger.debug(this.functionName + ' -> response-patient-current', args);

                this.messageService.sendMessage('response-patient-current', args);
            });

            this.electronService.ipcRenderer.on('patientChanged', (e, args) => {
                //this.logger.debug(this.functionName + ' -> patientChanged', args);

                this.messageService.sendMessage('patientChanged', args);

                const id = args.data.ids.find(item => item.idType === 'NhsNumber');

                const requestCareRecord = {
                    type: 'patient-carerecord',
                    data: {
                        isNhsNumber: true,
                        idValue: id.idValue
                    }
                };
                console.log('********************* requestCareRecord *********************');
                console.log('*************************************************************');
                console.log(JSON.stringify(requestCareRecord));

                this.electronService.ipcRenderer.send('requestCareRecord', JSON.stringify(requestCareRecord));
            });

            this.electronService.ipcRenderer.on('patientCleared', (e, args) => {
                //this.logger.debug(this.functionName + ' -> patientCleared', args);

                this.messageService.sendMessage('patientCleared', args);
            });

            this.electronService.ipcRenderer.on('response-patient-carerecord', (e, args) => {
                //this.logger.debug(this.functionName + ' -> response-patient-carerecord', args);

                this.messageService.sendMessage('response-patient-carerecord', args);
            });

            this.electronService.ipcRenderer.on('response-patient-demographics', (e, args) => {
                this.logger.debug(this.functionName + ' -> response-patient-demographics', args);

                this.messageService.sendMessage('response-patient-demographics', args);
            });


            this.electronService.ipcRenderer.on('userAction', (e, args) => {
                //this.logger.debug(this.functionName + ' -> userAction', args);

                const type = args.Message.toLowerCase();

                // User Login
                if (type.includes('integration was reactivated')) {

                    this.messageService.sendMessage('userLogin', 'Message from Home Component to App Component!');
                }
                else
                // Logout or PracticeApp closed
                if (type.includes('subscriber is removed by transaction im server (reason: emis web is closed)')) {

                    this.messageService.sendMessage('userLogout', 'Message from Home Component to App Component!');
                }
                else
                // Lock the PracticeApp
                if (type.includes('session is locked')) {

                    this.messageService.sendMessage('userLock', 'Message from Home Component to App Component!');
                }
                else
                // Unlock the PracticeApp
                if (type.includes('session is unlocked')) {

                    this.messageService.sendMessage('userUnlock', 'Message from Home Component to App Component!');
                }
            });

            this.electronService.ipcRenderer.on('pdf', (e, args) => {
                this.logger.debug(this.functionName + ' -> pdf', args);

                this.messageService.sendMessage('pdf', args);
            });

            this.electronService.ipcRenderer.on('getPrintersResult', (e, args) => {
                this.logger.debug(this.functionName + ' -> getPrintersResult', args);

                this.messageService.sendMessage('getPrintersResult', args);
            });

            this.electronService.ipcRenderer.on('hostInfo', (e, args) => {
                this.logger.debug(this.functionName + ' -> hostInfo', args);

                this.messageService.sendMessage('hostInfo', args);
            });

            this.electronService.ipcRenderer.on('updater', (e, args) => {
                this.logger.debug(this.functionName + ' -> updater', args);

                this.messageService.sendMessage('updater', args);
            });
        }
    }

    renderTheMessage(messageSubject: string, messageString: string ) {
        this.electronService.ipcRenderer.send(messageSubject, messageString);
    }
}
