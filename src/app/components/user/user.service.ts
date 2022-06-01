import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { MessageService } from '../../shared/services/message.service';
import { VersionService } from '../../shared/services/version.service';

import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserService implements OnDestroy {
  subscription: Subscription;
  public isLocked = true;
  public message: string;
    /*
        "loggedOnUsername": "DXS Test",
        "smartcardToken": "",
        "userInfo": {
            "userCode": null,
            "username": "DXS Test",
            "userDisplay": "TEST, DXS (Dr)",
            "userRole": null,
            "locationCode": "A28826",
            "locationName": "Nurt Leeds"
        }
    */
    public user = {
        // userCode: 'dxs-test',
        // userRole: 'unknown',
        // userName: 'DXS Test',
        // userDisplay: 'TEST, DXS (Dr)',
        // firstName: '',
        // lastName: '',
        // email: '',
        // locationCode: 'A28826',
        // locationName: 'Nurt Leeds',
        // practiceSmartCardID: ''

        userCode: '',
        userRole: '',
        userName: '',
        userDisplay: '',
        firstName: '',
        lastName: '',
        email: '',
        locationCode: '',
        locationName: '',
        practiceSmartCardID: ''
    };
    private isWorkingInstance = false;
    private className = 'UserService';
    private clinicalSystem = 'emis';

    constructor(
        private logger: NGXLogger,
        private httpClient: HttpClient,
        private versionService: VersionService,
        private messageService: MessageService) {
        this.logger.debug(this.className + '.constructor()');

        this.subscription = this.messageService.getMessage().subscribe(message => {

            switch (message.subject) {

                case 'connection':
                    this.onConnectionMessage(message.text);
                    this.logger.debug(this.className + '.getMessage:', message);
                    break;

                case 'heartbeat':
                case 'notification-connection':
                case 'notification-locking':
                    this.onNotificationMessage(message.text);
                    this.logger.debug(this.className + '.getMessage:', message);
                    break;
            }
        });
    }


    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }


    init() {
        this.logger.debug(this.className + '.init()');

        this.isWorkingInstance = true;
    }


    onConnectionMessage(message: any) {
        this.logger.debug(this.className + '.onConnectionMessage()', message);

        this.message = message.message;

        /*
        2.7.1.2 EMIS is up, but locked
        {
            "type": "connection",
            "message": "Integration service is not in a ready state: IntegrationLocked",
            "data": null
        }
        */
        if (message.data == null) {
            this.logger.debug(this.className + '.onConnectionMessage() - CS is up, but locked');

            this.doLock();

            return;
        }


        /*
         {
            "type": "connection",
            "message": "ERR: No connection",
            "data": {
                status: "error"
                statusId: -1
            }
        }
        */
        if (message.data.status === 'error') {
            this.logger.debug(this.className + '.onConnectionMessage() - ERROR');

            this.doLock();

            return;
        }

        /*
            2.7.1.1 EMIS is not open yet
            {
                "type": "connection",
                "message": "Service is ready!",
                "data": {
                    "status": "StartedEndpoints",
                    "statusId": 2,
                    "system": "Emis",
                    "onVersion": "1.0.0.0",
                    "integrationState": {
                        "stage": 3,
                        "isSessionLocked": false,
                        "selectedPatient": null,
                        "loggedOnUsername": null,
                        "smartcardToken": null
                    }
                }
            }
        */
        if (message.data.integrationState.stage === 3) {
            this.doLock();

            return;
        }

        /*
            2.7.1.3 Emis is already up
            {
            "type": "connection",
            "message": "Service is ready!",
            "data": {
                "status": "StartedEndpoints",
                "statusId": 2,
                "system": "Emis",
                "onVersion": "1.0.0.0",
                "integrationState": {
                    "stage": 6,
                    "isSessionLocked": false,
                    "selectedPatient": [
                        {
                        "isNhsNumber": false,
                        "idType": "InternalGuid",
                        "idValue": "5c97deff-05b9-46d6-a2aa-f053a1756a28"
                        },
                        {
                        "isNhsNumber": true,
                        "idType": "NhsNumber",
                        "idValue": "5178316681"
                        }
                    ],
                    "loggedOnUsername": "DXS Test",
                    "smartcardToken": "",
                    "userInfo": {
                        "userCode": null,
                        "username": "DXS Test",
                        "userDisplay": "TEST, DXS (Dr)",
                        "userRole": null,
                        "locationCode": "A28826",
                        "locationName": "Nurt Leeds"
                    }
                }
            }
            }
        */
        if (message.data.integrationState.stage === 6) {

            this.isLocked = false;
            this.setUser(message.data.integrationState.smartcardToken, message.data.integrationState.userInfo);

            // TODO: Check selected patient, then fetch patient

            return;
        }

    }


    onNotificationMessage(messageString: any) {
        this.logger.debug(this.className + '.onNotificationMessage()', messageString);
        this.logger.debug(this.className + '.onNotificationMessage()', typeof messageString);

        const message = messageString;


        /*
            {
                "type":"heartbeat",
                "message":"Server is alive.",
                "data":{
                    "atTime":"2021-03-04T14:01:59.3926051+00:00",
                    "isIntegrationActive":false,
                    "statusID":5,
                    "onVersion":"1.0.0.0"
                }
            }
        */
        if (message.type === 'heartbeat' && !message.data.isIntegrationActive) {
            this.doLock();

            return;
        }

        /*
            "type": "notification-locking",
            "code": "[Subscriber Identifier] : 2af53d7b-e8cf-4350-96f3-266273245e4d",
            "message": "Session is unlocked",
            "data": {
                "isSessionLocked": false
            }
        */
        if (message.type === 'notification-locking') {
            this.logger.debug(this.className + '.onNotificationMessage() - notification-locking', message.data.isSessionLocked);

            if (message.data.isSessionLocked) {
                this.logger.debug(this.className + '.onNotificationMessage() - notification-locking -- LOCKED');

                this.doLock();

                return;
            }

            this.isLocked = false;

            return;
        }

        /*
            {
                "type":"notification",
                "code":"[Subscriber Identifier] : 00000000-0000-0000-0000-000000000000",
                "message":"Subscriber is removed by Transaction IM server (Reason: Emis Web is closed)",
                "data":
                {
                    "IsDisconnected":"true"
                }
            }
        */
        if (message.type === 'notification' && message.data.IsDisconnected === 'true') {
            this.doLock();
            this.resetUser();

            return;
        }

        if (message.type === 'notification-connection' &&
            (message.data.isDisconnected || message.data.integrationState.loggedOnUsername == null)) {
            this.doLock();
            this.resetUser();

            return;
        }

        /*
            {
                "type": "notification-connection",
                "message": "IM1 connection changed!",
                "data": {
                    "status": "StartedEndpoints",
                    "statusId": 2,
                    "system": "Emis",
                    "onVersion": "1.0.0.0",
                    "integrationState": {
                        "stage": 6,
                        "isSessionLocked": false,
                        "selectedPatient": [],
                        "loggedOnUsername": "DXS Test",
                        "smartcardToken": "",
                        "userInfo": {
                            "userCode": null,
                            "username": "DXS Test",
                            "userDisplay": "TEST, DXS (Dr)",
                            "userRole": null,
                            "locationCode": "A28826",
                            "locationName": "Nurt Leeds"
                        }
                    }
                }
            }
        */
        if (message.type === 'notification-connection') {

            this.isLocked = false;
            this.setUser(message.data.integrationState.smartcardToken, message.data.integrationState.userInfo);

            return;
        }

    }


    /**
     * Function to handle login event from PracticeApp
     * redirect to home if we know the user else to register
     * @param data
     */
    doLogin(data) {
        this.logger.debug(this.className + '.doLogin()', data);

        // check if we know this user
        // if yes we change page to home - if No we change page to register

        // const headers = new Headers();
        // headers.append("Accept", 'application/json');
        // headers.append('Content-Type', 'application/json');
        // const requestOptions = new RequestOptions({ headers: headers });

        const url = environment.app.serverUrl + '/api/1/user/koos?type=desktop';

        this.httpClient.get(url).subscribe(
            data => {
                console.log(data['_body']);

                //TODO: this.navController.navigateRoot('/base');
            },
            error => {
                console.log(error);

                //TODO: this.navController.navigateRoot('/register');
            }
        );
    }


    doLogout(data) {
        this.logger.debug(this.className + '.doLogout()', data);

        //TODO: this.navController.navigateRoot('/login');
    }


    doLock() {
        this.logger.debug(this.className + '.doLock()');

        if(this.isLocked) {
            return;
        }

        this.isLocked = true;
        this.messageService.sendMessage('logoutWarning', '');
    }


    resetUser() {
        this.logger.debug(this.className + '.resetUser()');

        this.user.userCode = '';
        this.user.userRole = '';
        this.user.userName = '';
        this.user.userDisplay = '';
        this.user.firstName = '';
        this.user.lastName = '';
        this.user.email = '';
        this.user.locationCode = '';
        this.user.locationName = '';
        this.user.practiceSmartCardID = '';
    }


    setUser(smartcardToken: string, userInfo: any) {
        this.logger.debug(this.className + '.setUser()', smartcardToken, userInfo);

        this.user.userCode = userInfo.userCode;
        this.user.userRole = userInfo.userRole;
        this.user.userName = userInfo.username;
        this.user.userDisplay = userInfo.userDisplay;
        this.user.firstName = '';
        this.user.lastName = '';
        this.user.email = '';
        this.user.practiceSmartCardID = smartcardToken;
        this.user.locationCode = userInfo.locationCode;
        this.user.locationName = userInfo.locationName;

        this.doCheckin();
    }



    doCheckin() {
        this.logger.debug(this.className + '.doCheckin()', new Date());

        if (!this.isWorkingInstance) {
            return;
        }
        const now = new Date();
        const jsonData = {
                id: (this.clinicalSystem + '::' + this.user.userName.replace(/\s+/g, '') + '::' + this.user.locationCode).toLocaleLowerCase(),
                instanceId:  this.versionService.instanceId,
                instanceVersion:  this.versionService.version,
                timestamp: now.toISOString(),
                timestampEvent: now.toISOString(),
                userName: this.user.userName.replace(/\s+/g, '').toLocaleLowerCase(),
                userCode:this.user.userName.replace(/\s+/g, '').toLocaleLowerCase(),
                userDisplay: this.user.userDisplay,
                organisationName: this.user.locationName,
                organisationCode: this.user.locationCode
        };

        const url = `${environment.app.serverUrl}/api/1/instance-user-log`;
        this.logger.debug(this.className + '.doCheckin() - POST', url, jsonData);

        this.httpClient.post(url, jsonData).subscribe({
            next: (data) => {
                this.logger.debug(this.className + '.doCheckin() - SUCCESS', data);
            },
            error: (error) => {
                this.logger.debug(this.className + '.doCheckin() - ERROR', error);
            }
        });
    }


}
