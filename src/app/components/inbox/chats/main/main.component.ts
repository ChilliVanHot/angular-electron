import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
@Component({
    selector: 'app-main',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  translation;
  model;
  page = 1;
  pageSize = 10;
  itemList = [];
    loadingData = false;
    sortAsc = false;
    lastSortCol: string;
    filterData: any;
    displayList: any;

    highButton = 'danger';
    mediumButton = 'warning';
    lowButton = 'success';
    currentUser = 'simon';
    newMsg = '';
    isLoading = false;
    isHighSelected = true;
    isMediumSelected = true;
    isLowSelected = true;
    isVisibleGrid = true;
    isVisibleDetail = true;
    messages = [
      {
        user: 'simon',
        createdAt: 1554090856000,
        msg: 'Hey whats up mate first?'
      },
      {
        user: 'max',
        createdAt: 1554090956000,
        msg: 'Working on the Ionic mission, you?'
      },
      {
        user: 'simon',
        createdAt: 1554091056000,
        msg: 'Working on the Ionic mission, you?'
      },
      {
        user: 'simon',
        createdAt: 1554090856000,
        msg: 'Hey whats up mate?'
      },
      {
        user: 'max',
        createdAt: 1554090956000,
        msg: 'Working on the Ionic mission, you?'
      },
      {
        user: 'simon',
        createdAt: 1554091056000,
        msg: 'Working on the Ionic mission, you?'
      },
      {
        user: 'simon',
            createdAt: 1554090856000,
            msg: 'Hey whats up mate?'
        },
        {
          user: 'max',
          createdAt: 1554090956000,
          msg: 'Working on the Ionic mission, you?'
        },
        {
          user: 'simon',
            createdAt: 1554091056000,
            msg: 'Working on the Ionic mission, you last?'
          },
        ];
        private functionName = 'MainComponent.';

        constructor(private logger: NGXLogger,
          private translate: TranslateService ) {
        this.logger.debug(this.functionName + 'constructor()');
        this.filterData = [
            { val: 'danger', name: '180/110' },
            { val: 'warning', name: '160/90' },
            { val: 'success', name: '120/80' },
            { val: 'danger', name: '190/110' },
            { val: 'warning', name: '150/90' },
            { val: 'success', name: '110/80' },
            { val: 'danger', name: '185/110' },
            { val: 'warning', name: '158/90' },
            { val: 'success', name: '111/80' }
        ];

        this.filterItems();
    }


    ngOnInit() {
        this.logger.debug(this.functionName + 'constructor()');
        this.loadingData = true;

        setTimeout(() => {
            this.getMockData();
            this.loadingData = false;

        }, 2000);
    }


    sendMessage() {
        this.messages.push({
            user: 'simon',
            createdAt: new Date().getTime(),
            msg: this.newMsg
        });

        this.newMsg = '';

        setTimeout(() => {
        });
    }


    toggleHigh() {
        this.isHighSelected = !this.isHighSelected;
        this.filterItems();

        this.highButton = this.highButton === 'medium' ? 'danger' : 'medium';
    }


    toggleMedium() {

        this.isMediumSelected = !this.isMediumSelected;
        this.filterItems();

        this.mediumButton = this.mediumButton === 'medium' ? 'warning' : 'medium';
    }


    toggleLow() {

        this.isLowSelected = !this.isLowSelected;
        this.filterItems();

        this.lowButton = this.lowButton === 'medium' ? 'success' : 'medium';
    }


    filterItems() {

        this.displayList = this.filterData.filter((item) => {

            if ((item.val === 'danger' && this.isHighSelected) ||
                (item.val === 'warning' && this.isMediumSelected) ||
                (item.val === 'success' && this.isLowSelected)) {

                return true;
            }

            return false;
        });
    }


    doSort(columnName) {
        this.logger.debug(this.functionName + '.doSort() : ', columnName);

        if (columnName === this.lastSortCol) {
            this.sortAsc = !this.sortAsc;
        }
        this.lastSortCol = columnName;

        this.itemList.sort((previous: any, current: any) => {

            if (previous[columnName] > current[columnName]) {
                return !this.sortAsc ? -1 : 1;
            }
            else if (previous[columnName] < current[columnName]) {
                return this.sortAsc ? -1 : 1;
            }

            return 0;
        });
    }



    getMockData() {

        this.itemList = [
            // {
            //     "id": "1",
            //     "datetime": 1459296000000,
            //     "datetimeCreated": 1567419397096,
            //     "severity": "High",
            //     "type": "referral",
            //     "description": "high"
            // },
            // {
            //     "id": "2",
            //     "datetime": 1408406400000,
            //     "datetimeCreated": 1567419245661,
            //     "severity": "High",
            //     "type": "referral",
            //     "description": "high"
            // },
            // {
            //     "id": "3",
            //     "datetime": 1408406400000,
            //     "datetimeCreated": 1567416457050,
            //     "severity": "Medium",
            //     "type": "referral",
            //     "description": "medium"
            // },
            // {
            //     "id": "4",
            //     "datetime": -495590400000,
            //     "datetimeCreated": 1567416457051,
            //     "severity": "Low",
            //     "type": "static",
            //     "description": "low"
            // },
            // {
            //     "id": "5",
            //     "datetime": -356572800000,
            //     "datetimeCreated": 1567419461691,
            //     "severity": "Low",
            //     "type": "template",
            //     "description": "low"
            // },
            // {
            //     "id": "6",
            //     "datetime": -411609600000,
            //     "datetimeCreated": 1567416457051,
            //     "severity": "Low",
            //     "type": "referral",
            //     "description": "low"
            // },
            // {
            //     "id": "7",
            //     "datetime": -432432000000,
            //     "datetimeCreated": 1567419397096,
            //     "severity": "High",
            //     "type": "referral",
            //     "description": "high"
            // },
            // {
            //     "id": "8",
            //     "datetime": 1526774400000,
            //     "datetimeCreated": 1567419245663,
            //     "severity": "Low",
            //     "type": "static",
            //     "description": "low"
            // },
            // {
            //     "id": "9",
            //     "datetime": 1459296000000,
            //     "datetimeCreated": 1567419397096,
            //     "severity": "High",
            //     "type": "referral",
            //     "description": "high"
            // },
            // {
            //     "id": "10",
            //     "datetime": 1408406400000,
            //     "datetimeCreated": 1567419245661,
            //     "severity": "High",
            //     "type": "referral",
            //     "description": "high"
            // },
            // {
            //     "id": "11",
            //     "datetime": 1408406400000,
            //     "datetimeCreated": 1567416457050,
            //     "severity": "Medium",
            //     "type": "referral",
            //     "description": "medium"
            // },
            // {
            //     "id": "12",
            //     "datetime": -495590400000,
            //     "datetimeCreated": 1567416457051,
            //     "severity": "Low",
            //     "type": "static",
            //     "description": "low"
            // },
            // {
            //     "id": "13",
            //     "datetime": -356572800000,
            //     "datetimeCreated": 1567419461691,
            //     "severity": "Low",
            //     "type": "template",
            //     "description": "low"
            // },
            // {
            //     "id": "14",
            //     "datetime": -411609600000,
            //     "datetimeCreated": 1567416457051,
            //     "severity": "Low",
            //     "type": "referral",
            //     "description": "low"
            // },
            // {
            //     "id": "15",
            //     "datetime": -432432000000,
            //     "datetimeCreated": 1567419397096,
            //     "severity": "High",
            //     "type": "referral",
            //     "description": "high"
            // },
            // {
            //     "id": "16",
            //     "datetime": 1526774400000,
            //     "datetimeCreated": 1567419245663,
            //     "severity": "dddd",
            //     "type": "static",
            //     "description": "dddd"
            // },

        ];
    }


}
