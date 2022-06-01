import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ElectronService } from 'ngx-electron';


@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private functionName = 'NotificationService';

    candoNotification = true;


    constructor(private logger: NGXLogger,
                private electronService: ElectronService) {
        this.logger.debug(this.functionName + '.constructor()');

        if (!('Notification' in window)) {
            this.logger.debug('Web Notification not supported');

            this.candoNotification = false;

            return;
        }

        if (this.electronService.isElectronApp) {

            this.electronService.ipcRenderer.on('showNotification', (e, args) => {

                this.ShowNotification('Patient', 'Patient potentially at risk for hypertension.', 'assets/icon/alert.png', 3000);
                // this.ShowNotification('Patient', 'Patient potentially at risk for hypertension.', 'http://i.stack.imgur.com/Jzjhz.png?s=48&g=1', 3000);
            });

            this.electronService.ipcRenderer.on('openBrowser', (e, args) => {
                this.electronService.shell.openExternal('https://pcptest.dxs-systems.com/ExpertCare_V0/index.html');
            });
        }
    }


    ShowNotification(title: string, body: string, icon: string, duration: number) {

        // const notification = new Notification('Title', {
        //     body: 'HTML5 Web Notification API',
        //     icon: 'http://i.stack.imgur.com/Jzjhz.png?s=48&g=1',
        //     dir: 'auto'
        // });

        Notification.requestPermission((permission) => {
            const notification = new Notification(title, {
                body: body,
                icon: icon,
                dir: 'auto'
            });

            // notification.onclick = (event) => {
            //     this.uiService.isMenuVisible = false;
            //     this.electronService.remote.getCurrentWindow().setSize(950, 500);
            //     this.navController.navigateForward('/base/bp');
            // }

            notification.onclick = (event) => {
                if (this.electronService.isElectronApp) {
                    this.electronService.shell.openExternal('https://pcptest.dxs-systems.com/ExpertCare_V0/index.html');
                }
            }



            setTimeout(() => {
                notification.close();
            }, duration);
        });
    }

}
