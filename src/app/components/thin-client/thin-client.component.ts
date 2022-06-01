import { Component, OnInit, OnDestroy, AfterContentInit, ChangeDetectionStrategy, NgZone} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { DefaultThinClientSettings } from '../../_models/defaultThinClientSettings';
import { MessageService } from '../../shared/services/message.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-thin-client',
    templateUrl: './thin-client.component.html',
    styleUrls: ['./thin-client.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThinClientComponent implements OnInit, OnDestroy, AfterContentInit {
  loading = true;
  didLoad: boolean;
  thinClientSettingsForm: FormGroup;
  formGroup: FormGroup;
  errorMessage;
  subscription: Subscription;
  systemName: string;
  settingsFormToSubmit: string;
  messageService: MessageService;
  public form: any;
  public settingsModel: DefaultThinClientSettings ;
    private className = 'ThinClientComponent';
    constructor(private logger: NGXLogger,
                public _messageService: MessageService,
                public ngZone: NgZone) {

                    this.messageService = _messageService;
                    this.logger.debug('Thin Client'+this.className + '.constructor()');
                    this.messageService.sendMessage('requestThinClientDefaultSettings','');
//this.loading = false;
    }

    doSubmit(formGroup: FormGroup): void {
        this.logger.debug(this.className + '.doSubmit()', formGroup.valid);
        this.settingsFormToSubmit = JSON.stringify(this.settingsModel)
        this.messageService.sendMessage('cmdSaveThinClientSettings', formGroup.value);
       // formGroup.reset();
    }

    getthinClientSettingsFormControls() {
        return this.thinClientSettingsForm.controls;
    }

    ngOnInit() {
        this.formGroup = new FormGroup ({
            System:  new FormControl(),
            IP:  new FormControl(),
            WSPort: new FormControl(),
            WSSPort:  new FormControl(),
            WSCert:  new FormControl(),
            WSCertPwd:  new FormControl(),
            TCPPort:  new FormControl(),
            UIExe:  new FormControl(),
            NowDll: new FormControl(),
            NowVer: new FormControl(),
            LastDll: new FormControl(),
            LastVer: new FormControl(),
            IsUp: new FormControl(),
            TimerHeart: new FormControl(),
            TimerRelay: new FormControl(),
            TimerPoll: new FormControl(),
            OnUser:  new FormControl(),
            OnNacsCode:  new FormControl(),
            RemoteApiUrl: new FormControl(),
            LocalApiUrl:new FormControl(),
            ApiKey1: new FormControl(),
            ApiKey2:new FormControl(),
            EmisCert:  new FormControl(),
            EmisCertPwd: new FormControl(),
            TppDeviceID: new FormControl(),
        });
       // this.loading = true;
        this.subscription = this.messageService.getMessage().subscribe(message => {
            switch (message.subject) {
                case 'get-default-thin-client-config-settings':
                    this.logger.debug(this.className + '>get-default-thin-client--config-settings');
                    this.logger.debug(this.className + '>THIN CLIENT DATA', message.text.data);
                    this.settingsModel = message.text.data;
                    this.ngZone.run( () => {
                    this.settingsModel.System = this.settingsModel.System.toLowerCase();
                        this.loading = false;
                     });

                    this.didLoad = true
                    this.logger.debug('subscription this.Thin client settingsModel-->', this.settingsModel);
                break;
            default:
                break;
        }
        this.loading = false;
    });

    }
    ngAfterContentInit () {
        setTimeout(() => {
            if (this.didLoad) {
                this.loading = false
                }
        },5000)

    }
    ngOnDestroy ()
    {
        this.subscription.unsubscribe();
    }
}
