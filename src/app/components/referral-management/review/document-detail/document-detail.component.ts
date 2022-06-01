import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';


@Component({
    selector: 'app-document-detail',
    templateUrl: './document-detail.component.html',
    styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {
  translation;
  env = environment;

  public item: any;

  public areas = [
        { size: 20, order: 1, name: 'menu' },
        { size: 80, order: 2, name: 'grid' },
      ];
      private functionName = 'DocumentDetailComponent.';
      //    public itemList: Array<{ title: string, route: any, description: string, favourite: boolean }> = [];
      // public favouriteList: Array<{ title: string, route: any, description: string }>;
      constructor(private logger: NGXLogger,
        private route: ActivatedRoute,
                private translate: TranslateService) {


        this.logger.debug(this.functionName + 'constructor()');

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.logger.debug(this.functionName + 'ngOnInit() - id:', id);

            this.item = params.get(id);

            console.log(this.item);
        });
    }


    ngOnInit() {
        this.logger.debug(this.functionName + 'ngOnInit()');
    }


    onGutterClick(e: { gutterNum: number; sizes: number[] }) {
        this.logger.debug(this.functionName + 'onGutterClick()');

        if (!e || e.gutterNum !== 1) {
          return;
        }
        if (e.sizes[0] > 0) {
            this.areas = [
                { size: 0, order: 1, name: 'menu' },
                { size: 100, order: 2, name: 'grid' }
            ];

        }
        else {
            this.areas = [
                { size: 20, order: 1, name: 'menu' },
                { size: 80, order: 2, name: 'grid' }
            ];

        }
    }


    onDragEnd(e: { gutterNum: number; sizes: number[] }) {
        this.logger.debug(this.functionName + 'onDragEnd()');

        this.areas[0].size = e.sizes[0];
        this.areas[1].size = e.sizes[1];
    }


}
