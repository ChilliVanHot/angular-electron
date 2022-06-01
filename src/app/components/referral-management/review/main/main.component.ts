import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
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
    draftVersionHistoryList = [];
    decisionSupportAuditHistoryList = [];
    docVersionHistoryList = [];
    loadingData = false;
    sortAsc = false;
    lastSortCol: string;
    filterData: any;
    displayList: any;
    referralCriteriaList: any;
    referralTaskList: any;
    taskList = true;
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
    isVisibleDetail = false;
    isFilter = true;
    isAssign = false;
    isSelfAssign = false;
    isDelete = false;
    draftHistory = false;
    decisionSupportAudit = false;
    docVersionHistory = false;
    listView = true;
    cardView = false;
    person1 = false;
    person2 = false;
    person3 = false;
    person4 = false;
    routine = false;
    urgent = false;
    twoweekwait = false;
    messages = [
      // {
      //     user: 'simon',
      //     createdAt: 1554090856000,
      //     msg: 'Hey whats up mate first?'
      // },
      // {
      //     user: 'max',
      //     createdAt: 1554090956000,
      //     msg: 'Working on the Ionic mission, you?'
      // },
      // {
      //     user: 'simon',
      //     createdAt: 1554091056000,
      //     msg: 'Working on the Ionic mission, you?'
      // },
      // {
      //     user: 'simon',
      //     createdAt: 1554090856000,
      //     msg: 'Hey whats up mate?'
      // },
      // {
      //     user: 'max',
      //     createdAt: 1554090956000,
      //     msg: 'Working on the Ionic mission, you?'
      // },
      // {
      //     user: 'simon',
      //     createdAt: 1554091056000,
      //     msg: 'Working on the Ionic mission, you?'
      // },
      // {
      //     user: 'simon',
      //     createdAt: 1554090856000,
      //     msg: 'Hey whats up mate?'
      // },
      // {
      //     user: 'max',
      //     createdAt: 1554090956000,
      //     msg: 'Working on the Ionic mission, you?'
      // },
      // {
      //     user: 'simon',
      //     createdAt: 1554091056000,
      //     msg: 'Working on the Ionic mission, you last?'
      // },
  ];
    public messageRadioGroupForm: FormGroup;
    public areas = [
      { size: 20, order: 1, name: 'menu' },
      { size: 80, order: 2, name: 'grid' },
    ];
    private functionName = 'MainComponent.';

    constructor(private logger: NGXLogger,
        private translate: TranslateService ,
        private formBuilder: FormBuilder,
        private router: Router) {


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
        this.messageRadioGroupForm = this.formBuilder.group({
            messageRadioGroupForm: 'recent'
          });
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
            { size: 40, order: 1, name: 'menu' },
            { size: 60, order: 2, name: 'grid' },
          ];

        }
      }

      onDragEnd(e: {gutterNum: number; sizes: number[]}) {
        this.areas[0].size = e.sizes[0];
        this.areas[1].size = e.sizes[1];
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

    clearAssignedTo(){
        console.log();
        this.person1 = false;
        this.person2 = false;
        this.person3 = false;
        this.person4 = false;
    }
    clearCreatedBy(){
        console.log();
        this.person1 = false;
        this.person2 = false;
        this.person3 = false;
        this.person4 = false;
    }
    clearPriority(){
        console.log();
        this.routine = false;
        this.urgent = false;
        this.twoweekwait = false;
    }

    taskToggle(){
        this.taskList = !this.taskList;
    }


    showDraftHistory(){
        this.draftHistory = true;
        this.decisionSupportAudit = false;
        this.docVersionHistory = false;
    }
    showDecisionSupportHistory(){
        this.draftHistory = false;
        this.decisionSupportAudit = true;
        this.docVersionHistory = false;
    }
    showDocVersionHistory(){
        this.draftHistory = false;
        this.decisionSupportAudit = false;
        this.docVersionHistory = true;
    }

    showList(){
        this.listView = true;
        this.cardView = false;
    }

    showCard(){
        this.listView = false;
        this.cardView = true;
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
            //     "createdBy": "Dr John",
            //     "patient": "Miss D Nelson",
            //     "speciality": "Podiatry",
            //     "documentname": "Corns and Caluses",
            //     "ubrn": "1234567",
            //     "duedate": 1459296000000,
            //     "priority": "Routine",
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
            //     "ubrn": "555678",
            //     "duedate": 1459296000000,
            //     "priority": "Routine",
            //     "assignedtask": "Outstanding"
            // },
            // {
            //     "id": "3",
            //     "datetime": 1459296000000,
            //     "datetimeCreated": 1567419397096,
            //     "createdBy": "Dr A.J Patterson",
            //     "patient": "Miss D Nelson",
            //     "speciality": "Dentistry",
            //     "documentname": "Root Canal",
            //     "ubrn": "87654321",
            //     "duedate": 1459296000000,
            //     "priority": "Urgent",
            //     "assignedtask": "Completed"
            // }


        ];

        this.draftVersionHistoryList = [
            // {
            //     "id": "1",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "2",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Auto populated from CS",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "3",
            //     "inputField": "Alcohol Consumption",
            //     "formSection": "Risk Factors",
            //     "input": "Value: 17 Units/week",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "4",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "5",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "6",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "7",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "8",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "9",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "10",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "11",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "12",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "13",
            //     "inputField": "Previous Cancer",
            //     "formSection": "Risk Factors",
            //     "input": "Dropdown: Neck",
            //     "source": "Me",
            //     "duedate": 1459296000000
            // },


        ];
        this.decisionSupportAuditHistoryList = [
            // {
            //     "id": "1",
            //     "activity": "Alert: Inappropriate referral",
            //     "reason": "Lump size < 35 mm in diameter",
            //     "user": "Me",
            //     "response": "Reject CDS: Multiple instances of previous cancer",
            //     "evidence": "NICE Guideline: Suspected head and neck cancer",
            //     "duedate": 1459296000000
            // },
            // {
            //     "id": "1",
            //     "activity": "Alert: Referral criteria incomplete",
            //     "reason": "Submit with outstanding referral criteria",
            //     "user": "Nurse Patty",
            //     "response": "Accept CDS",
            //     "evidence": "Blackpool Teaching Hospital referral criteria",
            //     "duedate": 1459296000000
            // }
        ];

        this.docVersionHistoryList = [ ];

        this.referralCriteriaList = [
            // {
            //     "id": "1",
            //     "criteria": "Patient is older than 18 years" ,
            //     "criteria_doc": "Demographics",
            //     "evidence": "Birth Date > 2003",
            //     "addedon": 1567419397096,
            //     "status": "Met"
            // },
            // {
            //     "criteria": "Recorded clinical symptom for head and neck cancer " ,
            //     "criteria_doc": "Clinical Feature",
            //     "evidence": "Selected: An unexplained persistent swelling in the parotid or submandibular gland",
            //     "addedon": 1567419397096,
            //     "status": "Met"
            // },
            // {
            //     "id": "3",
            //     "criteria": "Lump size measured" ,
            //     "criteria_doc": "Lump Information",
            //     "evidence": "Value: 20 mm",
            //     "addedon": 1567419397096,
            //     "status": "Met"
            // },
        ];

        this.referralTaskList = [
            // {
            //     "id": "1",
            //     "taskType": "Task 3" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "High",
            //     "taskStatus": "Overdue"
            // },
            // {
            //     "id": "2",
            //     "taskType": "Task 2" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Outstanding"
            // },
            // {
            //     "id": "3",
            //     "taskType": "Task 1" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Completed"

            // },
            // {
            //     "id": "4",
            //     "taskType": "Task 1" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Completed"

            // },
            // {
            //     "id": "5",
            //     "taskType": "Task 1" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Completed"

            // },
            // {
            //     "id": "6",
            //     "taskType": "Task 1" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Completed"

            // },
            // {
            //     "id": "7",
            //     "taskType": "Task 1" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Completed"

            // },
            // {
            //     "id": "8",
            //     "taskType": "Task 1" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Completed"

            // },
            // {
            //     "id": "9",
            //     "taskType": "Task 1" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Completed"

            // },
            // {
            //     "id": "10",
            //     "taskType": "Task 1" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Completed"

            // },
            // {
            //     "id": "11",
            //     "taskType": "Task 1" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Completed"

            // },
            // {
            //     "id": "12",
            //     "taskType": "Task 1" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Completed"

            // },
            // {
            //     "id": "13",
            //     "taskType": "Task 1" ,
            //     "taskDescription": "Task description",
            //     "assignedBy": "Me",
            //     "assignedTo": "Me",
            //     "dueDate": 1567419397096,
            //     "priority": "Low",
            //     "taskStatus": "Completed"

            // },

        ];
    }

    showPage(item: any) {
        this.logger.debug(this.functionName + 'showPage() : ', item);


                this.router.navigate(['/referral-management/review/document-detail', item.id]);

        }

}
