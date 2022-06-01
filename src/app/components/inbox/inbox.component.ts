import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  translation;
    public areas = [
        { size: 20, order: 1, name: 'menu' },
        { size: 80, order: 2, name: 'grid' },
    ];
    public appPages = [
      {
          title: 'Chats',
          url: '/inbox/chats',
          icon: 'chatbubbles'
      },
      {
          title: 'Feedback',
          url: '/inbox/feedback',
          icon: 'paper'
      },
      {
          title: 'Alerts',
          url: '/inbox/alerts',
          icon: 'alert'
      },
      {
          title: 'List',
          open: false,
          children: [
              {
                  title: 'AAAA',
                  url: 'list-detail',
                  icon: 'alert'
              },
              {
                  title: 'BBBB',
                  url: 'list-detail',
                  icon: 'alert'
              },
              {
                  title: 'CCC',
                  url: 'list-detail',
                  icon: 'alert'
              }
          ]
      }
  ];
  isListOpen = true;
  private functionName = 'InboxComponent.';

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
          return;}

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

}
