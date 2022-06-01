import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NGXLogger } from 'ngx-logger';


/**
 * MessageService
 *
 * This is a local service bus
 */
@Injectable({ providedIn: 'root' })
export class MessageService {
    private functionName = 'MessageService';
    private subject = new Subject<any>();

    constructor(private logger: NGXLogger) {
        this.logger.debug(this.functionName + '.constructor()');
    }

     sendMessage(subject: string, message: string) {
        this.logger.debug(this.functionName + '.sendMessage()', message);

        this.subject.next({ subject, text: message });
    }

    clearMessages() {
        //this.logger.debug(this.functionName + '.clearMessages()');
        this.subject.next({ subject: null, text: null });
    }


    getMessage(): Observable<any> {
        //this.logger.debug(this.functionName + '.getMessage(): Observable');

        return this.subject.asObservable();
    }
}
