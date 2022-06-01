import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';
import { MessageService } from '../../../shared/services/message.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-idle-modal',
  templateUrl: './idle-modal.component.html',
  styleUrls: ['./idle-modal.component.scss']
})
export class IdleModalComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  countDown = environment.app.idle.timeout;
  private className = 'IdleModalComponent';

    constructor(private logger: NGXLogger,
                public activeModal: NgbActiveModal,
                private messageService: MessageService) {
        this.logger.debug(this.className + '.constructor()');

        this.subscription = this.messageService.getMessage().subscribe(message => {
            this.logger.debug(this.className + 'getMessage:', message.subject);

            if(message.subject === 'idleCountDown') {

                this.countDown = message.text;
            }
        });
    }


    ngOnInit() {
        this.logger.debug(this.className + '.ngOnInit()');
    }


    ngOnDestroy() {
        this.logger.debug(this.className + '.ngOnDestroy()');

        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
