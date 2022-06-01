import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
// import { EventService } from '../_services/event.service';
// import { UsersService } from '../users/users.service';
// import { AuthService } from '../auth/auth.service';


@Injectable()
export class ReportService {
  selectedSurvey: any = {};
  favouriteHeadingActive = false;
  allHeadingActive = true;
  itemList: Array<{ title: string,
    route: any, description: string, favourite: boolean}> = [{ title: 'Day 6+ Questionnaire',            route: 'surveyDay6',                  description: 'Day 6+ Questionnaire Report', favourite: false },
        { title: 'Day 28 Questionnaire',            route: 'surveyDay28',                 description: 'Day 28 Questionnaire Report', favourite: false },
        { title: 'Blood Pressure Programme Summary', route: 'programBloodPressureMonthly', description: 'BP Programme Summary',         favourite: false }
    ];

    favouriteList: Array<{ title: string, route: any, description: string, favourite: boolean}>;
    private functionName = 'ReportService';

    constructor(private http: HttpClient,
      // private eventService: EventService,
      // private authService: AuthService,
      // private userService: UsersService
                ) {
        console.log(this.functionName + '.constructor()');


        this.favouriteList = this.itemList.filter(item => { return item.favourite;
         });


        // for (let i=0; i < this.reportList.length; i++) {
        //     if(this.authService.user.favouriteReports != null &&
        //        this.authService.user.favouriteReports[this.reportList[i].route] != null) {
        //         this.reportList[i].favourite = true;
        //     }
        // }

        // this.eventService.logout.subscribe(data => {
        //     this.clearData();
        // })
    }


    clearData() {
        console.log(this.functionName + '.clearData()');

        this.itemList.length = 0;
    }


    updateFavourite(item) {
        console.log(this.functionName + '.addFavourite() - params: ', item);

        item.favourite = !item.favourite;

        this.favouriteList = this.itemList.filter(item => {
            return item.favourite;
        });

        // if (item.favourite) {
        //     if(this.authService.user.favouriteReports == null) {
        //         this.authService.user.favouriteReports = {};
        //     }
        //     this.authService.user.favouriteReports[item.route] = true;
        // }
        // else {
        //     this.authService.user.favouriteReports[item.route] = undefined;
        // }

        // this.userService.update(this.authService.user);
    }


    // getSurveys(startDate, endDate) {
    //     console.log(this.functionName + '.getSurveys() params - startDate:' + startDate + ' endDate:' + endDate);

    //     try {
    //         let url = environment.app.serverUrl + '/api/1/questionaire';

    //         let params = new HttpParams()
    //                     .set('startDate', startDate)
    //                     .set('endDate', endDate);


    //         return this.http.get(url, { params: params }).map(
    //             (resp: any) => {
    //                 console.log(this.functionName + '.getSurveys() - SUCCESS:', resp);

    //                 this.docList = resp.data;

    //                 return resp;
    //             },
    //             error => {
    //                 console.log(this.functionName + '.getSurveys() - ERROR:', error);

    //                 return error;
    //             }
    //         )
    //     }
    //     catch (error) {
    //         console.log(this.functionName + '.getSurveys() - error: ', error);

    //         return error;
    //     };
    // }

}
