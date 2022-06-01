import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { MessageService } from '../../shared/services/message.service';

import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  translation;
  env = environment;
  subscription: Subscription;
  messages = '';
  private functionName = 'HomeComponent.';
    constructor(private ngZone: NgZone,
                private logger: NGXLogger,
                private messageService: MessageService,
                private translate: TranslateService ) {


        this.subscription = this.messageService.getMessage().subscribe(message => {

            if (message.subject === 'message') {
                this.logger.debug(this.functionName + 'getMessage:', message);

                this.ngZone.run(() => {
                    this.messages = this.messages + '<br/>';
                });
            }
        });
    }


    ngOnInit() {

    }
}
