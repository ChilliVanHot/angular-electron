import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { MessageService } from '@shared/services/message.service';
import { User } from "./users.model";

import { environment } from '../../../../environments/environment';


@Injectable()
export class UsersService {
    private functionName = 'UsersService';

    docList: User[] = [];
    doc: any;

    roleList: any = [
        { id: 0, value: "nurse" },
        { id: 1, value: "practice manager" },
        { id: 2, value: "doctor" },
        { id: 3, value: "receptionist" },
        { id: 4, value: "admin" }
    ];


    constructor(private http: HttpClient,
                private messageService: MessageService) {
        console.log(this.functionName + '.constructor()');
        console.log(environment);

        // TODO:
        // this.eventService.logout.subscribe(data => {
        //     this.clearData();
        // })
    }


    clearData() {
        console.log(this.functionName + '.clearData()');

        this.docList.length = 0;
    }


    ngOnInit() {
        console.log(this.functionName + '.ngOnInit()');

    }


    // getAll() {
    //     console.log(this.functionName + '.getAll()');

    //     try {
    //         let url = environment.app.serverUrl + '/api/1/user';
    //         console.log("URL: ", url);

    //         return this.http.get(url).map(
    //             (response: any) => {
    //                 this.docList.length = 0;
    //                 Array.prototype.push.apply(this.docList, response.data);

    //                 return response;

    //             }, (error) => {
    //                 console.log(this.functionName + '.getAll() - ERROR: ', error);

    //                 return error;
    //             }
    //         );
    //     }
    //     catch (error) {
    //         console.log(this.functionName + '.getAll() - SERVER ERROR: ', error);

    //         return error;
    //     }

    // }


    search(payload: any): Promise<any> {
        console.log(this.functionName + '.search() - params:', payload);

        // Initialize Params Object
        let Params = new HttpParams();

        if (payload.firstName != null && payload.firstName !== '') {
            Params = Params.append('firstName', payload.firstName);
        }
        if (payload.lastName != null && payload.lastName !== '') {
            Params = Params.append('lastName', payload.lastName);
        }
        if (payload.email != null && payload.email !== '') {
            Params = Params.append('email', payload.email);
        }

        let url = environment.app.serverUrl + '/api/1/user';
        console.log(this.functionName + '.search() - URL: ', url);
        console.log(this.functionName + '.search() - PARAMS:', Params);

        return this.http.get(url, { params: Params }).toPromise().then(
            response => {
                return Promise.resolve(response);
            },
            error => {
                return Promise.reject(error.message);
            }
        )
        .catch(
            this.handleError
        );
    }


    create(user: any) {
        console.log(this.functionName + '.create()');

        return new Promise((resolve, reject) => {

            try {
                return this.http.post(environment.app.serverUrl + '/api/1/user', user).subscribe(
                    (response: any) => {
                        console.log(this.functionName + '.create() - Create Success: ', response);

                        if (response.status == "success") {

                            if (response.data) {
                                this.doc = response.data;
                                this.docList.push(this.doc);

                                console.log("Doc: ", this.doc);
                                console.log("Doc List: ", this.docList);

                                resolve(response);
                            }
                        }
                        else {
                            reject(response);
                        }
                    }
                );
            }
            catch (error) {
                console.log(this.functionName + '.create() - Create Failed - error: ', error);

                reject(true);
            }
        });
    }


    update(user: any) {
        console.log(this.functionName + '.update()');

        return new Promise((resolve, reject) => {
            try {
                return this.http.put(environment.app.serverUrl + '/api/1/user', user).subscribe((response: any) => {
                    console.log(this.functionName + '.update() - Update Success: ', response);

                    if (response.status == "success") {

                        if (response.data) {
                            this.doc = response.data;

                            for (var i = 0; i < this.docList.length; i++) {
                                if (this.docList[i].id == user.id) {
                                    this.docList[i] = this.doc;
                                }
                            }

                            resolve(response);
                        }
                    }
                    else {
                        reject(response);
                    }

                }, error => {
                    console.log("New Error: ", error);
                });
            }
            catch (error) {
                console.log(this.functionName + '.create() - Update Failed - error: ', error);
                reject(true);
            }
        });
    }


    delete(docID: string) {
        console.log(this.functionName + '.delete()');

        return new Promise((resolve, reject) => {

            try {
                let httpParams = new HttpParams()
                    .append("id", docID)

                return this.http.delete(environment.app.serverUrl + '/api/1/user', { params: httpParams }).subscribe((response: any) => {
                    console.log(this.functionName + '.delete() - Delete Success: ', response);

                    if (response.data) {
                        this.doc = response.data;

                        for (var i = 0; i < this.docList.length; i++) {

                            if (this.docList[i].id == this.doc.id) {
                                this.docList.splice(i, 1);
                            }
                        }

                        resolve(this.doc);
                    }
                });
            }
            catch (error) {
                console.log(this.functionName + '.delete() - Delete Failed - error: ', error);

                reject(true);
            }
        });
    }


    private handleError(error: Response | any) {
        console.error(this.functionName + error.message || error);

        return Observable.throw(error.message || error);
    }

}
