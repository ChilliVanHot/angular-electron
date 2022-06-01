import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private className = 'FeedbackService';


    constructor(private logger: NGXLogger,
                private httpClient: HttpClient) {
        this.logger.debug(this.className + '.constructor()');

    }


    sendFeedback(params: any) {
        console.log(this.className + '.sendFeedback()', params );

        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const url = environment.app.serverUrl + '/api/1/supportEmail';
        console.log(this.className + '.sendFeedback() - URL', url);

        return this.httpClient.post(url, params, { headers });
    }
}
