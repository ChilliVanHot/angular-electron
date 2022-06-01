import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { NGXLogger } from 'ngx-logger';

import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class InstallerService {
    private className = 'InstallerService';


    constructor(
        private logger: NGXLogger,
        private http: HttpClient, ) {
        this.logger.debug(this.className + '.constructor()');

    }




}
