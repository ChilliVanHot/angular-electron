import { Component, OnInit, OnDestroy, AfterContentInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { DefaultSettings } from '../../_models/defaultSettings';
import { MessageService } from '../../shared/services/message.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-neuron',
    templateUrl: './neuron.component.html',
    styleUrls: ['./neuron.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeuronComponent implements OnInit, OnDestroy, AfterContentInit {
  loading = true;
  didLoad: boolean;
  neuronSettingsForm: FormGroup;
  formGroup: FormGroup;
  errorMessage;
  subscription: Subscription;
  systemName: string;
  settingsFormToSubmit: string;
  messageService: MessageService;
  public form: any;
  public settingsModel: DefaultSettings ;
  private className = 'NeuronComponent';
  constructor(private logger: NGXLogger,
    public _messageService: MessageService,
                public ngZone: NgZone) {

                    this.messageService = _messageService;
                    this.logger.debug('NEURON'+this.className + '.constructor()');
                    this.messageService.sendMessage('requestDefaultSettings','');
//this.loading = false;
    }


    doSubmit(formGroup: FormGroup): void {

        this.logger.debug(this.className + '.doSubmit()', formGroup.valid);
        this.settingsFormToSubmit = JSON.stringify(this.settingsModel);
        this.messageService.sendMessage('cmdSaveSettings', formGroup.value);
       // formGroup.reset();

    }
    getNeuronSettingsFormControls() {
        return this.neuronSettingsForm.controls;
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
                case 'get-default-config-settings':
                    this.logger.debug(this.className + '>get-default-config-settings');
                    this.logger.debug(this.className + '>DATA', message.text.data);
                    this.settingsModel = message.text.data;
                    this.ngZone.run( () => {
                    this.settingsModel.System = this.settingsModel.System.toLowerCase();
                        this.loading = false;
                     });


                    this.didLoad = true;
                    this.logger.debug('subscription this.settingsModel-->', this.settingsModel);
                break;
            default:
                break;
        }
        this.loading = false;
    });

    }
    ngAfterContentInit() {
        setTimeout(() => {
            if (this.didLoad) {
                this.loading = false;
                }
        },5000);

    }
    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }
}
