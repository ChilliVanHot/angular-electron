import { Injectable } from '@angular/core';
// import { ToasterService } from 'angular2-toaster';


@Injectable()
export class AlertService {
    // private toasterService: ToasterService;

    constructor(
        // toasterService: ToasterService
        )
     {
    //   this.toasterService = toasterService;
    }

    popToast(type, title, body) {
        // this.toasterService.pop(type, title, body);
    }

}
