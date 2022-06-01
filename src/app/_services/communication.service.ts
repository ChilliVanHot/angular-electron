import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ElectronService } from 'ngx-electron';

declare var ActionheroWebsocketClient: any;


@Injectable({
    providedIn: 'root'
})
export class CommunicationService {
    private functionName = 'CommunicationService';

    public status = {
        networkAvail: false,
        practiceSys: false
    }



    constructor(private logger: NGXLogger,
                private electronService: ElectronService) {
        this.logger.debug(this.functionName + '.constructor()');


        if (this.electronService.isElectronApp) {

            this.electronService.ipcRenderer.on('heartbeat', (e, args) => {
                this.logger.debug(this.functionName + ' -> heartbeat', args);


                this.status.practiceSys = args.data.isPipeActive;

                console.log(this.status);

            });

        }

        this.openSocketAH();
    }

    openSocketAH() {
        console.log(this.functionName + '.openSocketAH()');

        const client = new ActionheroWebsocketClient();

        client.on('connected', () => {
            console.log('connected!')

            this.status.networkAvail = true;
        });

        client.on('disconnected', () => {
            console.log('disconnected :(')

            this.status.networkAvail = false;
        })

        client.on('error', (error) => { console.log('error', error.stack) })
        client.on('reconnect', () => { console.log('reconnect') })
        client.on('reconnecting', () => { console.log('reconnecting') })

        // client.on('message',      function(message){ console.log(message) })

        client.on('alert', (message) => {
            alert(JSON.stringify(message))
        });

        client.on('api', (message) => {
            alert(JSON.stringify(message))
        });

        client.on('welcome', (message) => { console.log('message-welcome', message); })
        client.on('say', (message) => { console.log('message-say', message); })

        client.connect((error, details) => {
            if (error) {
                console.error(error);
            }
            else {
                client.action('createChatRoom', { name: 'defaultRoom' }, (data) => {
                    client.roomAdd("defaultRoom");


                    console.log('client.id', client.id);
                    console.log('client.fingerprint', client.fingerprint);

                });
            }
        });

    }

}
