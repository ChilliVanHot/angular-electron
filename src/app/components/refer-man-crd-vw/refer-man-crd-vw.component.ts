import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-refer-man-crd-vw',
  templateUrl: './refer-man-crd-vw.component.html',
  styleUrls: ['./refer-man-crd-vw.component.scss']
})
export class ReferralManagementCardViewComponent implements OnInit {
    env = environment;
    translation;
    model;
    person1;
    person2;
    person3;
    person4;
    routine;
    urgent;
    twoweekwait;
    loadingData = false;
    sortAsc = false;
    lastSortCol: string;
    filterData: any;
    displayList: any;
    isLoading = false;
    isFilter = true;
    isAssign = false;
    isSelfAssign = false;
    isDelete = false;
    itemList = [];
    constructor(private logger: NGXLogger,
        private translate: TranslateService ,
        private router: Router) {}

  ngOnInit() {
    this.loadingData = true;
    this.getMockData();
    setTimeout(() => {
        this.loadingData = false;

    }, 2000);
  }

  getMockData() {

    this.itemList = [
        // {
        //     "id": "1",
        //     "datetime": 1459296000000,
        //     "datetimeCreated": 1567419397096,
        //     "createdBy": "Dr John",
        //     "patient": "Mrs R Smith",
        //     "speciality": "Podiatry",
        //     "documentname": "Corns and Caluses",
        //     "duedate": 1459296000000,
        //     "priority": "2week wait",
        //     "assignedtask": "Overdue"
        // },
        // {
        //     "id": "2",
        //     "datetime": 1459296000000,
        //     "datetimeCreated": 1567419397096,
        //     "createdBy": "Nurse Patty",
        //     "patient": "Miss D Nelson",
        //     "speciality": "Podiatry",
        //     "documentname": "Corns and Caluses",
        //     "duedate": 1459296000000,
        //     "priority": "Routine",
        //     "assignedtask": "Outstanding"
        // },
        // {
        //     "id": "3",
        //     "datetime": 1459296000000,
        //     "datetimeCreated": 1567419397096,
        //     "createdBy": "Dr A.J Patterson",
        //     "patient": "Mr M Wilson",
        //     "speciality": "Dentistry",
        //     "documentname": "Root Canal",
        //     "duedate": 1459296000000,
        //     "priority": "Urgent",
        //     "assignedtask": "Completed"
        // }, {
        //     "id": "4",
        //     "datetime": 1459296000000,
        //     "datetimeCreated": 1567419397096,
        //     "createdBy": "Dr John",
        //     "patient": "Mrs R Smith",
        //     "speciality": "Podiatry",
        //     "documentname": "Corns and Caluses",
        //     "duedate": 1459296000000,
        //     "priority": "2week wait",
        //     "assignedtask": "Overdue"
        // },
        // {
        //     "id": "5",
        //     "datetime": 1459296000000,
        //     "datetimeCreated": 1567419397096,
        //     "createdBy": "Nurse Patty",
        //     "patient": "Miss D Nelson",
        //     "speciality": "Podiatry",
        //     "documentname": "Corns and Caluses",
        //     "duedate": 1459296000000,
        //     "priority": "Routine",
        //     "assignedtask": "Outstanding"
        // },
        // {
        //     "id": "6",
        //     "datetime": 1459296000000,
        //     "datetimeCreated": 1567419397096,
        //     "createdBy": "Dr A.J Patterson",
        //     "patient": "Mr M Wilson",
        //     "speciality": "Dentistry",
        //     "documentname": "Root Canal",
        //     "duedate": 1459296000000,
        //     "priority": "Urgent",
        //     "assignedtask": "Completed"
        // }


    ];
}}
