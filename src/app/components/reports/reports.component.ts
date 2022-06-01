import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { ReportService } from './report.service';


@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  translation;
  env = environment;
  public filterText: string;
  public areas = [
    { size: 20, order: 1, name: 'menu' },
    { size: 80, order: 2, name: 'grid' },
  ];
  public itemList: Array<{ title: string, route: any, description: string, favourite: boolean }>;
  private functionName = 'Reports.ReportsComponent.';
  // public favouriteList: Array<{ title: string, route: any, description: string }>;
  constructor(private logger: NGXLogger,
    public reportService: ReportService,
                private translate: TranslateService) {


        this.logger.debug(this.functionName + 'constructor()');
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


    updateFavourite(item: any) {
        this.logger.debug(this.functionName + 'updateFavourite()', item);

        this.reportService.updateFavourite(item);

    }
}
