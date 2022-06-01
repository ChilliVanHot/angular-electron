import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { PasswordValidation } from '../password-validation';
import { UsersService } from "../users.service";
import { AlertService } from '@shared/services/alert.service';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    private functionName = 'MainComponent';
    page = 1;
    pageSize = 10;

    translation;
    env = environment;
    isDataLoading = false;
    isSearchLoading = false;
    itemList: any = [];


    filterData: any;
    displayList: any;

    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    message: string;

    roleValue: string = "Select Role";

    itemErrorMessage: string;
    itemSuccessMessage: string;
    itemSelected: any;

    sortAsc: boolean = false;
    lastSortColumn = '';
    highButton: string = 'danger';
    mediumButton: string = 'warning';
    lowButton: string = 'success';

    isHighSelected = true;
    isMediumSelected = true;
    isLowSelected = true;

    public searchForm: FormGroup;
    public insertItemForm: FormGroup;
    public updateItemForm: FormGroup;

    public submitted: boolean; // keep track on whether form is submitted


    constructor(public docService: UsersService,
                private modalService: NgbModal,
                private formBuilder: FormBuilder,
                private alertService: AlertService,
                private translate: TranslateService) {




        // Declare Search Form
        this.searchForm = this.formBuilder.group({
            firstName: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl()
        });

        // Declare Insert Form
        this.insertItemForm = this.formBuilder.group({
            firstName: ['', [<any>Validators.required, <any>Validators.minLength(3)]],
            lastName: ['', [<any>Validators.required, <any>Validators.minLength(3)]],
            email: ['', [<any>Validators.required, Validators.pattern(this.emailPattern)]],
            mobileNumber: ['', [<any>Validators.required]],
            countryCode: ['', [<any>Validators.required]],
            role: ['', [<any>Validators.required]],
            password: ['', [<any>Validators.required]],
            verifyPassword: ['', [<any>Validators.required]],

        },
            {
                validator: PasswordValidation.MatchPassword
            }
        );

        // Declare Update Form
        this.updateItemForm = this.formBuilder.group({
            firstName: ['', [<any>Validators.required, <any>Validators.minLength(3)]],
            lastName: ['', [<any>Validators.required, <any>Validators.minLength(3)]],
            email: ['', [<any>Validators.required, Validators.pattern(this.emailPattern)]],
            mobileNumber: ['', [<any>Validators.required]],
            countryCode: ['', [<any>Validators.required]],
            role: ['', [<any>Validators.required]],
            password: [''],
            verifyPassword: [''],
        },
            {
                validator: PasswordValidation.MatchPassword
            }
        );
    }


    ngOnInit() {
        console.log(this.functionName + '.ngOnInit()');

        if (this.docService.docList.length > 0) {
            this.itemList = this.docService.docList;

            return;
        }

        this.getAllItems();
    }


    // toggleHigh() {
    //     this.isHighSelected = !this.isHighSelected;
    //     this.filterItems();

    //     this.highButton = this.highButton === 'medium' ? 'danger' : 'medium';
    // }


    // toggleMedium() {

    //     this.isMediumSelected = !this.isMediumSelected;
    //     this.filterItems();

    //     this.mediumButton = this.mediumButton === 'medium' ? 'warning' : 'medium';
    // }


    // toggleLow() {

    //     this.isLowSelected = !this.isLowSelected;
    //     this.filterItems();

    //     this.lowButton = this.lowButton === 'medium' ? 'success' : 'medium';
    // }

    refresh() {
        console.log(this.functionName + '.refresh()');

        this.searchForm.reset();
        this.itemList = this.docService.docList;
    }


    search(formData: any) {
        console.log(this.functionName + '.search() - params: ', formData);

        this.isDataLoading = true;

        if ((formData.firstName !== '' && formData.firstName !== null) &&
            (formData.lastName !== '' && formData.lastName !== null) &&
            (formData.email !== '' && formData.email !== null)) {

            console.log(this.functionName + '.search() - ERROR: Invalid Parameters');

            return;
        }

        this.docService.search(formData).then(
            docList => {
                this.itemList = docList.data;
                this.isDataLoading = false;
            },
            error => {
                console.log(this.functionName + '.search() - ERROR:', error)

                this.isDataLoading = false;
            }
        );
    }


    showInsertModal(template: TemplateRef<any>) {
        console.log(this.functionName + '.showInsertModal()');

        this.itemErrorMessage = "";
        this.itemSuccessMessage = "";
        this.submitted = false;

        // Clear Insert Form
        this.insertItemForm.reset();

        // this.insertModalRef = this.modalService.show(template);
    }


    showUpdateModal(template: TemplateRef<any>, item) {
        console.log(this.functionName + '.showUpdateModal() - param: ', JSON.stringify(item));

        this.itemErrorMessage = "";
        this.itemSuccessMessage = "";
        this.submitted = false;

        this.itemSelected = item;

        let doc = [];
        let roleValue;
        let roleID;

        // Get RoleID and Value From Role List For Selected Item
        for (var i = 0; i < this.docService.roleList.length; i++) {
            doc[i] = this.docService.roleList[i];
            if (doc[i].value == this.itemSelected.role) {
                roleID = doc[i].id
                roleValue = doc[i].value
            }
        }

        // Clear Update Form
        this.updateItemForm.patchValue({
            firstName: this.itemSelected.firstName,
            lastName: this.itemSelected.lastName,
            email: this.itemSelected.email,
            role: this.docService.roleList[roleID].value,
            countryCode: item.countryCode,
            mobileNumber: item.mobileNumber
        });

        // this.updateModalRef = this.modalService.show(template);
    }


    showDeleteModal(template: TemplateRef<any>, item) {
        console.log(this.functionName + '.showDeleteModal() - param: ', JSON.stringify(item));

        this.itemErrorMessage = "";
        this.itemSuccessMessage = "";
        this.submitted = false;
        this.itemSelected = item;
        // this.deleteModalRef = this.modalService.show(template);
    }


    getAllItems() {
        console.log(this.functionName + '.getAllItems()');

        this.isDataLoading = true;

        setTimeout(() => {
            this.getMockData();
            this.isDataLoading = false;

        }, 2000);

        // this.docService.getAll().subscribe(
        //     (resp: any) => {
        //         console.log(this.functionName + '.getAll() - SUCCESS: ', resp);

        //         this.itemList = resp.data;
        //         this.isDataLoading = false;

        //     },
        //     error => {
        //         console.log(this.functionName + '.getAll() - ERROR: ', error);

        //         this.isDataLoading = false;
        //     }
        // );
    }


    doCreate(user: any) {
        console.log(this.functionName + '.doCreate() - params:' + JSON.stringify(user));

        this.submitted = true;

        // Ensure Email Address has no spaces and is lower case
        user.email = user.email.toLowerCase();
        user.email = user.email.split(' ').join('');

        const body = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "countryCode": user.countryCode,
            "mobileNumber": user.mobileNumber,
            "role": user.role,
            "password": user.password,
            "type": "user",
            "active": true
        }
        console.log(this.functionName + '.doCreate() - body Sent: ', JSON.stringify(body));

        this.docService.create(body).then(
            (response: any) => {
                console.log(this.functionName + '.doCreate() - SUCCESS: ', JSON.stringify(response));

                // this.insertModalRef.hide();
                this.alertService.popToast('success', 'Success', response.message);
            },
            (error: any) => {
                console.log(this.functionName + '.doCreate() - ERROR: ', JSON.stringify(error));

                this.alertService.popToast('error', 'Error', error.message);
            }
        );
    }


    selectedCountryCode(event) {
        console.log("Country Code Selected: ", event)
    }


    doUpdate(user: any) {
        console.log(this.functionName + '.updateItem() - param:' + JSON.stringify(user));

        this.submitted = true;

        // Ensure Email Address has no spaces and is lower case
        user.email = user.email.toLowerCase();
        user.email = user.email.split(' ').join('');

        const body = {
            "id": this.itemSelected.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "countryCode": user.countryCode,
            "mobileNumber": user.mobileNumber,
            "role": user.role,
            "password": user.password,
            "type": "user",
            "active": true
        }
        console.log(this.functionName + '.updateItem() - body Sent: ', JSON.stringify(body));

        this.docService.update(body).then(
            (result: any) => {
                console.log(this.functionName + '.updateItem() - SUCCESS - result:', result);

                // this.updateModalRef.hide();
                this.alertService.popToast('success', 'Success', 'Update User Success');
            },
            (error: any) => {
                this.alertService.popToast('error', 'Error', error.message);
            }
        );
    }


    doSort(columnName) {

        if (columnName == this.lastSortColumn) {
            this.sortAsc = !this.sortAsc;
        }
        this.lastSortColumn = columnName;

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


    doDelete(): void {
        console.log(this.functionName + '.deleteItem()');

        this.docService.delete(this.itemSelected.id).then(
            (result: any) => {
                console.log(this.functionName + '.delete() - SUCCESS', result);

                // this.deleteModalRef.hide();
                this.alertService.popToast('success', 'Success', 'Update User Success');
            },
            (error: any) => {
                console.log(this.functionName + '.delete() - ERROR', error);

                // this.deleteModalRef.hide();
                this.alertService.popToast('error', 'Error', 'Unable to delete user');
            }
        );
    }


    getMockData() {

        this.itemList =
        [
            {
              "active": true,
              "countryCode": "+27",
              "email": "constant.laubscher@gmail.com",
              "firstName": "Constant",
              "id": "user::052d9610-1f27-11e9-b13c-7fce793f1095",
              "lastName": "Laubscher",
              "mobileNumber": "747468452",
              "role": [
                "alerts",
                "programs",
                "patients",
                "reports",
                "devices",
                "organizations",
                "users"
              ],
              "type": "user"
            },
            {
                "active": true,
                "countryCode": "+27",
                "email": "constant.laubscher@gmail.com",
                "firstName": "Constant",
                "id": "user::052d9610-1f27-11e9-b13c-7fce793f1095",
                "lastName": "Laubscher",
                "mobileNumber": "747468452",
                "role": [
                  "alerts",
                  "programs",
                  "patients",
                  "reports",
                  "devices",
                  "organizations",
                  "users"
                ],
                "type": "user"
              },
              {
                "active": true,
                "countryCode": "+27",
                "email": "constant.laubscher@gmail.com",
                "firstName": "Constant",
                "id": "user::052d9610-1f27-11e9-b13c-7fce793f1095",
                "lastName": "Laubscher",
                "mobileNumber": "747468452",
                "role": [
                  "alerts",
                  "programs",
                  "patients",
                  "reports",
                  "devices",
                  "organizations",
                  "users"
                ],
                "type": "user"
              },
              {
                "active": true,
                "countryCode": "+27",
                "email": "constant.laubscher@gmail.com",
                "firstName": "Constant",
                "id": "user::052d9610-1f27-11e9-b13c-7fce793f1095",
                "lastName": "Laubscher",
                "mobileNumber": "747468452",
                "role": [
                  "alerts",
                  "programs",
                  "patients",
                  "reports",
                  "devices",
                  "organizations",
                  "users"
                ],
                "type": "user"
              },
              {
                "active": true,
                "countryCode": "+27",
                "email": "michelle.smith@gmail.com",
                "firstName": "Michelle",
                "id": "user::052d9610-1f27-11e9-b13c-7fce793f1095",
                "lastName": "Smith",
                "mobileNumber": "747468452",
                "role": [
                  "alerts",
                  "programs",
                  "patients",
                  "reports",
                  "devices",
                  "organizations",
                  "users"
                ],
                "type": "user"
              },
            {
              "active": true,
              "countryCode": "UK",
              "email": "first@test.uk",
              "firstName": "First",
              "id": "user::11111111-1111-1111-1111-111111111111",
              "lastName": "Guy",
              "mobileNumber": "111111111111",
              "role": "owner",
              "type": "user"
            },
            {
              "active": true,
              "countryCode": "UK",
              "email": "second@test.uk",
              "firstName": "Second",
              "id": "user::22222222-2222-2222-2222-222222222222",
              "lastName": "Guy",
              "mobileNumber": "222222222222",
              "role": "existing",
              "type": "user"
            },
            {
              "active": true,
              "countryCode": "+44",
              "email": "stan.shepherd@mypcrco.com",
              "firstName": "Stan",
              "id": "user::76d27a50-2397-11e9-9705-2f012d6f459f",
              "lastName": "Shepherd",
              "mobileNumber": "7909926240",
              "role": [
                "alerts",
                "programs",
                "patients",
                "reports",
                "devices",
                "organizations",
                "users"
              ],
              "type": "user"
            },
            {
              "active": true,
              "countryCode": "+27",
              "email": "kayleen@dxs-systems.com",
              "firstName": "Technical-QA",
              "id": "user::8ffd61e0-590b-11e8-bfdd-3def9bc3779d",
              "lastName": "QualityAssurance-Testing",
              "mobileNumber": "760840678",
              "role": [
                "alerts",
                "programs",
                "patients",
                "reports",
                "devices",
                "organizations",
                "users"
              ],
              "type": "user"
            },
            {
              "active": true,
              "countryCode": "+27",
              "email": "carl@propartners.co.za",
              "firstName": "Carl",
              "id": "user::e1e231c0-8db3-11e8-aa3a-6b1cb2279912",
              "lastName": "Vorster",
              "mobileNumber": "833907003",
              "role": [
                "alerts",
                "programs",
                "patients",
                "reports",
                "devices",
                "organizations",
                "users"
              ],
              "type": "user"
            },
            {
              "active": true,
              "countryCode": "+44",
              "email": "steven.bauer@dxs-systems.co.uk",
              "firstName": "Steven",
              "id": "user::fdcd63b0-5a8f-11e9-aac8-1b6dd0b790e9",
              "lastName": "Bauer",
              "mobileNumber": "7788598550",
              "role": [
                "alerts",
                "programs",
                "patients",
                "reports",
                "devices",
                "organizations",
                "users"
              ],
              "type": "user"
            },
            {
                "active": true,
                "countryCode": "+44",
                "email": "steven.bauer@dxs-systems.co.uk",
                "firstName": "Steven",
                "id": "user::fdcd63b0-5a8f-11e9-aac8-1b6dd0b790e9",
                "lastName": "Bauer",
                "mobileNumber": "7788598550",
                "role": [
                  "alerts",
                  "programs",
                  "patients",
                  "reports",
                  "devices",
                  "organizations",
                  "users"
                ],
                "type": "user"
              },
              {
                "active": true,
                "countryCode": "+44",
                "email": "steven.bauer@dxs-systems.co.uk",
                "firstName": "Steven",
                "id": "user::fdcd63b0-5a8f-11e9-aac8-1b6dd0b790e9",
                "lastName": "Bauer",
                "mobileNumber": "7788598550",
                "role": [
                  "alerts",
                  "programs",
                  "patients",
                  "reports",
                  "devices",
                  "organizations",
                  "users"
                ],
                "type": "user"
              },
              {
                "active": true,
                "countryCode": "+44",
                "email": "steven.bauer@dxs-systems.co.uk",
                "firstName": "Steven",
                "id": "user::fdcd63b0-5a8f-11e9-aac8-1b6dd0b790e9",
                "lastName": "Bauer",
                "mobileNumber": "7788598550",
                "role": [
                  "alerts",
                  "programs",
                  "patients",
                  "reports",
                  "devices",
                  "organizations",
                  "users"
                ],
                "type": "user"
              },
              {
                "active": true,
                "countryCode": "+44",
                "email": "steven.bauer@dxs-systems.co.uk",
                "firstName": "Steven",
                "id": "user::fdcd63b0-5a8f-11e9-aac8-1b6dd0b790e9",
                "lastName": "Bauer",
                "mobileNumber": "7788598550",
                "role": [
                  "alerts",
                  "programs",
                  "patients",
                  "reports",
                  "devices",
                  "organizations",
                  "users"
                ],
                "type": "user"
              },
              {
                "active": true,
                "countryCode": "+44",
                "email": "steven.bauer@dxs-systems.co.uk",
                "firstName": "Steven",
                "id": "user::fdcd63b0-5a8f-11e9-aac8-1b6dd0b790e9",
                "lastName": "Bauer",
                "mobileNumber": "7788598550",
                "role": [
                  "alerts",
                  "programs",
                  "patients",
                  "reports",
                  "devices",
                  "organizations",
                  "users"
                ],
                "type": "user"
              }
          ];
    }


}
