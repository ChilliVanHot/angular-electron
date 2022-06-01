import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';

import { MessageService } from '../../../shared/services/message.service';

import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-logout-warning-modal',
    templateUrl: './logout-warning-modal.component.html',
    styleUrls: ['./logout-warning-modal.component.scss']
})
export class LogoutWarningModalComponent implements OnInit, OnDestroy {
  timer;
  subscription: Subscription;
  countDown = environment.app.logout.warningTime;
  private className = 'LogoutWarningModalComponent';

    constructor(private logger: NGXLogger,
                private activeModal: NgbActiveModal,
                private messageService: MessageService) {
        this.logger.debug(this.className + '.constructor()');

    }


    ngOnInit() {
        this.logger.debug(this.className + '.ngOnInit()');

        this.subscription = this.messageService.getMessage().subscribe(message => {
            this.logger.debug(this.className + 'getMessage:', message.subject);

            if(message.subject === 'logoutWarningCancel') {
                this.activeModal.dismiss('logoutWarningCancel');
            }
        });

        this.timer = setInterval(() => {
            this.countDown = --this.countDown;
            console.log('countDown', this.countDown);
            if(this.countDown <= 0) {
                clearInterval(this.timer);
                this.messageService.sendMessage('closeMainWindow', '');
                this.activeModal.dismiss('closeMainWindow');
            }
        }, 1000);
    }


    ngOnDestroy() {
        this.logger.debug(this.className + '.ngOnDestroy()');

        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
