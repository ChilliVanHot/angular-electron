import { Component, OnInit } from '@angular/core';

import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { AngularSplitModule } from 'angular-split';
import { SettingsService } from './settings.service';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
//import { MessageService } from '@shared/services/message.service';
@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    settingsService: SettingsService;
    translation;
    env = environment;

    public areas = [
        { size: 20, order: 1, name: 'menu' },
        { size: 80, order: 2, name: 'grid' },
      ];

    constructor(private translate: TranslateService,
                public _settingsService: SettingsService,
                public route: ActivatedRoute,
                public router: Router,
              ) {
            this.settingsService = _settingsService;
        }
    setSideMenu(menuName: string) {
        this.settingsService.setSideMenu(menuName);
    }

    ngOnInit() {
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
