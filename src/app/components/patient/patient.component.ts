import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { AngularSplitModule } from 'angular-split';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  translation;
  env = environment;
  isListOpen = true;
  public areas = [
    { size: 20, order: 1, name: 'menu' },
    { size: 80, order: 2, name: 'grid' },
  ];
  public appPages = [
    {
      title: 'Chats',
      url: '/patient/chats',
      icon: 'chatbubbles'
    },
    {
      title: 'Alerts',
      url: '/patient/alerts',
      icon: 'alert'
    }

    ];
    private functionName = 'PatientComponent.';


    constructor(private logger: NGXLogger,
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
        if (!e || e.gutterNum !== 1) {
          return;
        }

        if(e.sizes[0] > 0) {
          this.areas = [
            { size: 0, order: 1, name: 'menu' },
            { size: 100, order: 2, name: 'grid' },
          ];

        }
        else {
          this.areas = [
            { size: 20, order: 1, name: 'menu' },
            { size: 80, order: 2, name: 'grid' },
          ];

        }
      }

      onDragEnd(e: {gutterNum: number; sizes: number[]}) {
        this.areas[0].size = e.sizes[0];
        this.areas[1].size = e.sizes[1];
      }

}
