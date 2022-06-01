
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { interval, Subscription } from 'rxjs';

import { MessageService } from './message.service';

import { environment } from '../../../environments/environment';


/**
 * VersionService
 *
 *
 */
@Injectable({ providedIn: 'root' })
export class VersionService {
  public instanceId: string;
  public version: string;
  private isUpgrading = false;
  private isWorkingInstance = false;
  private className = 'VersionService';
  private subscriptionMessages: Subscription;
  private subscriptionTimer: Subscription;
  private intervalId: number;
  private intervalInMillis = 10000;
    private host = {
        totalMemory: '', // return is in bytes
        type: '', // Linux, Darwin or Window_NT
        platform: '', // 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
        architecture: '', // 'x64', 'arm' and 'ia32'
        cpus: '',
        hostname: '',
        userInfo: ''
    };


    constructor(
        private logger: NGXLogger,
        private httpClient: HttpClient,
        private messageService: MessageService) {
        this.logger.debug(this.className + '.constructor()');

        this.subscriptionMessages = this.messageService.getMessage().subscribe(message => {

            switch (message.subject) {
                case 'hostInfo':
                    this.logger.debug(this.className + '.getMessage:', message.subject);

                    this.doCheckinAtStartup(message.text);
                    break;
            }
        });
    }


    init() {
        this.logger.debug(this.className + '.init()');

        this.isWorkingInstance = true;
        this.messageService.sendMessage('getHostInfo', '');
    }


    startVersionChecker() {
        this.logger.debug(this.className + '.startVersionChecker()');

        const source = interval(this.intervalInMillis);
        this.subscriptionTimer = source.subscribe(val => this.doCheckin());
    }


    doCheckinAtStartup(params: any) {
        this.logger.debug(this.className + '.doCheckinAtStartup()', params);

        /*
            {
                "instanceId": "db6af8527bb48985f258f90ef43ee5e38936b8d29ef6dea41f5b32b090fb5b4e",
                "version": "0.4.5",
                "host": {
                    "totalMemory": 24576,
                    "type": "Darwin",
                    "platform": "darwin",
                    "architecture": "x64",
                    "cpus": [{
                        "model": "Intel(R) Core(TM) i5-3470 CPU @ 3.20GHz",
                        "speed": 3200,
                        "times": {
                            "user": 91695740,
                            "nice": 0,
                            "sys": 66848710,
                            "idle": 446013180,
                            "irq": 0
                        }
                    }, {
                        "model": "Intel(R) Core(TM) i5-3470 CPU @ 3.20GHz",
                        "speed": 3200,
                        "times": {
                            "user": 85432110,
                            "nice": 0,
                            "sys": 54182550,
                            "idle": 464941880,
                            "irq": 0
                        }
                    }, {
                        "model": "Intel(R) Core(TM) i5-3470 CPU @ 3.20GHz",
                        "speed": 3200,
                        "times": {
                            "user": 75918410,
                            "nice": 0,
                            "sys": 41684670,
                            "idle": 486953410,
                            "irq": 0
                        }
                    }, {
                        "model": "Intel(R) Core(TM) i5-3470 CPU @ 3.20GHz",
                        "speed": 3200,
                        "times": {
                            "user": 68676410,
                            "nice": 0,
                            "sys": 35637180,
                            "idle": 500242870,
                            "irq": 0
                        }
                    }],
                    "hostname": "Carls-iMac-2.local",
                    "userInfo": {
                        "uid": 502,
                        "gid": 20,
                        "username": "carl",
                        "homedir": "/Users/carl",
                        "shell": "/bin/bash"
                    }
                }
            }
        */

        this.instanceId = params.instanceId;
        this.host = params.host;
        this.version = params.version;

        if (!this.isWorkingInstance) {
            return;
        }

        this.startVersionChecker();

        const now = new Date();

        const jsonData = {
            id: now.getTime(),
            instanceId: this.instanceId,
            instanceVersion: this.version,
            name: this.host.hostname,

            timestamp: now.toISOString(),
            timestampEvent: now.toISOString(),
            type: this.host.type,
            opsys: this.host.platform,
            cpu: JSON.stringify(this.host.cpus),
            ram: this.host.totalMemory,
            diskSpace: 'unknown',
            macAddresses: 'unknown'
        };

        const url = `${environment.app.serverUrl}/api/1/instance-devices`;
        this.logger.debug(this.className + '.doCheckinAtStartup() - POST', url, jsonData);

        this.httpClient.post(url, jsonData).subscribe({
            next: (data) => {
                this.logger.debug(this.className + '.doCheckinAtStartup() - SUCCESS', data);
            },
            error: (error) => {
                this.logger.debug(this.className + '.doCheckinAtStartup() - ERROR', error);
            }
        });
    }


    doCheckin() {
        this.logger.debug(this.className + '.doCheckin()', new Date());

        this.httpClient.get(`${environment.app.serverUrl}/api/1/instances/${this.instanceId}`).subscribe({
            next: (response: any) => {
                this.logger.debug(this.className + '.doCheckin() - SUCCESS', response);

                const nowMillis = new Date().getTime();
                const data = response.data;

                /*
                    "id": "db6af8527bb48985f258f90ef43ee5e38936b8d29ef6dea41f5b32b090fb5b4e",
                    "versionCurrent": "0.4.5",
                    "versionTarget": "0.4.6",
                    "versionChange": 1,
                    "versionChangeTimestamp": null,
                    "disabled": null
                */

                // TODO: cleanup on server
                data.versionChange = data.versionChange == null? 0: data.versionChange;
                data.versionTarget = data.versionTarget == null? data.versionCurrent: data.versionTarget;
                data.versionChangeTimestamp = data.versionChangeTimestamp == null? 0: data.versionChangeTimestamp;

                const doUpgrade = data.versionChange === 1;


                console.log('1', !this.isUpgrading);
                console.log('2', doUpgrade);
                console.log('3', Number(data.versionChangeTimestamp) < nowMillis);

                console.log('4', data.versionChangeTimestamp);
                console.log('5', nowMillis);


                if(!this.isUpgrading
                   && doUpgrade
                   && this.version !== data.versionTarget
                   && Number(data.versionChangeTimestamp) < nowMillis) {

                    this.isUpgrading = true;
                    const installerURL = `${environment.app.urlUpdate}/${data.versionTarget}`;
                    // const installerURL = `http://localhost:8081/${data.versionTarget}`;

                    this.logger.debug(this.className + '.doCheckin() - UPDATE', installerURL);

                    this.messageService.sendMessage('doUpgrade', installerURL);
                }
            },
            error: (error) => {
                this.logger.debug(this.className + '.doCheckin() - ERROR', error);
            }
        });
    }

}
