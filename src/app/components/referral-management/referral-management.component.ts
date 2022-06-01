import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-referral-management',
    templateUrl: './referral-management.component.html',
    styleUrls: ['./referral-management.component.scss']
})
export class ReferralManagementComponent implements OnInit {
    private functionName = 'ReferralManagementComponent.';
    translation;

    public areas = [
        { size: 20, order: 1, name: 'menu' },
        { size: 80, order: 2, name: 'grid' },
    ];

    isListOpen = true;




    constructor(private logger: NGXLogger,
        private router: Router,
        private translate: TranslateService ) {


        this.logger.debug(this.functionName + 'constructor()');
    }


    ngOnInit() {
    }

    toggleListOpen() {
        this.logger.debug(this.functionName + 'toggleListOpen()', this.isListOpen);

        this.isListOpen = !this.isListOpen;
    }

    onGutterClick(e: {gutterNum: number; sizes: number[]}) {
        if (!e || e.gutterNum !== 1) return;

        if(e.sizes[0] > 0) {
          this.areas = [
            { size: 0, order: 1, name: 'menu' },
            { size: 100, order: 2, name: 'grid' },
          ];

        }
        else {
          this.areas = [
            { size: 40, order: 1, name: 'menu' },
            { size: 60, order: 2, name: 'grid' },
          ];

        }
      }

      onDragEnd(e: {gutterNum: number; sizes: number[]}) {
        this.areas[0].size = e.sizes[0];
        this.areas[1].size = e.sizes[1];
      }

      searchForms(){
        this.router.navigate(['searchMain/main']);
      }

}
