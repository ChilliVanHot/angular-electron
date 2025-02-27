import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  closeResult: string;
  env = environment;
  downloadedPercentage = 18;
  isSideMenuHidden = environment.app.isSideMenuHidden;
  private className = 'AppComponent';
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private logger: NGXLogger,
  ) {
    this.translate.setDefaultLang('en');
    console.log('environment', environment);
    this.logger.debug(this.className + '.constructor()');
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }
}
