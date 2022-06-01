import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  translation;
  env = environment;
  milesSelection: string[] = ["5", "10", "15", "20", "25"];
  selectedMiles: string = "Miles";
  daysSelection: string[] = ["1 day", "5 days", "7 days", "14 days"];
    selectedDays: string = "Days";
    includeFavourites = true;
    unCheckPriorityRoutine = false;
    unCheckPriorityUrgent = false;
    unCheckPriority2weekwait = false;
    unCheckCommissionedBy = false;
    unCheckServiceSupported = false;
    serviceLocation;
    formSearch;
    referralForm: boolean;
    serviceProvider: boolean;
    pratientAddress: boolean;
    practiceAddress: boolean;
    public filterText: string;
    public areas = [
      { size: 20, order: 1, name: 'menu' },
      { size: 80, order: 2, name: 'grid' },
    ];
    public itemList: Array<{ title: string, route: any, description: string, favourite: boolean }>;
    // public favouriteList: Array<{ title: string, route: any, description: string }>;
    private functionName = 'Reports.ReportsComponent.';
    constructor(private logger: NGXLogger,
        private translate: TranslateService) {


        this.logger.debug(this.functionName + 'constructor()');


    }


    ngOnInit() {
        this.logger.debug(this.functionName + 'ngOnInit()');


    }


    MilesSelect(newSelection: string) {
        this.selectedMiles = newSelection;
    }
    DaysSelect(newSelection: string) {
        this.selectedDays = newSelection;
    }

    onGutterClick(e: { gutterNum: number; sizes: number[] }) {
        this.logger.debug(this.functionName + 'onGutterClick()');

        if (!e || e.gutterNum !== 1) return;

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

    clearPriority(){
        console.log();
        this.unCheckPriorityRoutine = false;
        this.unCheckPriorityUrgent = false;
        this.unCheckPriority2weekwait = false;
    }
    clearCommissionedBy(){
        console.log(this.unCheckCommissionedBy);
        this.unCheckCommissionedBy = false;
    }
    clearServiceSupported(){
        console.log(this.unCheckServiceSupported);
        this.unCheckServiceSupported = false;
    }

}
