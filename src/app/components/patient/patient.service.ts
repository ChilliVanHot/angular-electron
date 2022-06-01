import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription, fromEvent, firstValueFrom, throwError  } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import * as xml2js from 'xml2js';
import { Base64 } from 'js-base64';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
// import { DeviceService } from '../settings/devices/device.service';
import { MessageService } from '../../shared/services/message.service';


@Injectable()
export class PatientService {

  docList: any = [];
  recentPatientList: any = [];
    alertList: any = [];
    selectedPatient: any;
    selectedBloodTest: any;
    selectedImmunisation: any;
    bloodTestList = [];
    immunisationList = [];
    immunisationLookup = {};
    loadingPatient = false;
    subscription: Subscription;
    public patient = {
      dbID: '',
      documents: {
        contentdescription: '',
        contentfilename: '',
        clientlocationname: '',
        clientlocationtype: '',
        documenttype:''
      },
      registration: {
        title: '',
        callingName: '',
        familyName: '',
        nhsNumber: '',
        dateOfBirth: '',
        gender: '',
        phoneMobile: '',
        address: {
          houseNameFlat: '',
          street: '',
          village: '',
          town: '',
          county: '',
          postCode: ''
            }
        }
    };
    public patientXML: string;
    private key: any;
    private args: any[];
    private className = 'PatientService';
    private patientKey;
    constructor(private ngZone: NgZone,
                private logger: NGXLogger,
                private httpClient: HttpClient,
                // private deviceService: DeviceService,
                private messageService: MessageService) {
        this.logger.debug(this.className + '.constructor()');

        // TODO:
        // this.eventService.logout.subscribe(data => {
        //     this.clearData();
        // })

        this.subscription = this.messageService.getMessage().subscribe(message => {
            this.logger.debug(this.className + '.getMessage:', message.subject);

            switch (message.subject) {
                case 'patientChanged':
                    this.loadingPatient = true;
                    this.requestPatientRecord();
                    break;

                case 'patientCleared':
                        this.resetPatient();
                    break;

                case 'response-patient-carerecord':
                    this.loadingPatient = false;
                    this.parsePatientRecord(message.text);
                    break;

                case 'response-patient-demographics':
                    this.loadingPatient = false;
                    this.parsePatientDemographics(message.text);
                    break;

                case 'loadPatientRecord':
                    this.loadingPatient = true;
                    this.requestPatientRecord();
                    break;
            }
        });

        this.messageService.sendMessage('cmdStartThinClient', '');
    }


    requestPatientRecord() {
        this.loadingPatient = true;
        this.logger.debug(this.className + '.requestPatientRecord');

        this.messageService.sendMessage('requestPatientCareRecord', this.patient.registration.nhsNumber);

        this.patientXML = null;
    }


    parsePatientDemographics(params: any) {
        this.logger.debug(this.className + '.parsePatientDemographics:', params);
        xml2js.parseString(params.data.demographics, (err, result) => {
            console.log('============================================================================');
            console.log('============================================================================');
            if (err) {
                console.log('============================= PATIENT DEMOGRAPHICS ERROR ===============================================');
                console.log(err);
            }
            console.log(result);
            console.log('>>#' + JSON.stringify(result));
            this.ngZone.run(() => {
                const medicalRecord =
                result['soap:Envelope']['soap:Body'][0]['q1:DistributionEnvelope'][0]['q1:payloads'][0]['q1:payload'][0]['MedicalRecord'];
                const registration = medicalRecord[0]['Registration'][0];
                console.log('=====PATIENT DEMOGRAPHICS=======================================================================');
                console.log(registration);
                //`EC ${this.patientService.patient.registration.title} ${this.patientService.patient.registration.callingName} ${this.patientService.patient.registration.familyName} (${this.patientService.patient.registration.nhsNumber}).pdf`

                this.patient.dbID = registration.DBID[0];
                this.patient.documents.contentdescription = 'ExpertCare Hypertension Medication Review (' + moment(new Date()).format('DD/MMM/YYYY') + ')';
                this.patient.documents.contentfilename = 'EC '+ registration.Title[0] +' '+ registration.CallingName[0] +' '+ registration.FamilyName[0] +' ('+ registration.NhsNumber[0]+').pdf';
                this.patient.documents.clientlocationname = registration.Address.Town;
                this.patient.documents.clientlocationtype = 'Expert Care Test Upload';
                this.patient.documents.documenttype = 'Hypertension medication review';

                this.patient.registration.dateOfBirth = registration.DateOfBirth[0];
                this.patient.registration.familyName = registration.FamilyName[0];
                this.patient.registration.nhsNumber = registration.NhsNumber[0];
                this.patient.registration.callingName = registration.CallingName[0];
                this.patient.registration.title = registration.Title[0];
                this.patient.registration.gender = registration.Sex[0];

                this.patient.registration.phoneMobile = (registration.Mobile) ? registration.Mobile[0] : '' ;
                this.patient.registration.address.houseNameFlat = registration.Address[0].HouseNameFlat[0];
                this.patient.registration.address.street = registration.Address[0].Street[0];
                this.patient.registration.address.village = registration.Address[0].Village[0];
                this.patient.registration.address.town = registration.Address[0].Town[0];
                this.patient.registration.address.county = registration.Address[0].County[0];
                this.patient.registration.address.postCode = registration.Address[0].PostCode[0];
            });
        });
    }

    parsePatientRecord(params: any) {
        this.logger.debug(this.className + '.parsePatientRecord:', params);
        // console.log(typeof params);
        // const paramsObj = JSON.parse(params);
        this.patientXML = params.data.record;
        // Parses the XML to JSON
        // xml2js.parseString(params.record, (err, result) => {
            // console.log('============================================================================');
            // console.log('============================================================================');
            // if (err) {
            //     console.log('============================= ERROR ===============================================');
            //     console.log(err);
            // }
            // console.log(result);

            // this.ngZone.run(() => {

                // this.patient = result["soap:Envelope"]
                //["soap:Body"][0]["q1:DistributionEnvelope"][0]["q1:payloads"][0]["q1:payload"][0]["MedicalRecord"];

                // console.log(this.patient);
                // this.patient.registration = this.patient[0]['Registration'][0];
                // this.patient.Registration = undefined;

                // this.patient.registration.dateOfBirth = this.patient.registration.DateOfBirth[0];
                // this.patient.registration.familyName = this.patient.registration.FamilyName[0];
                // this.patient.registration.nhsNumber = this.patient.registration.NhsNumber[0];
                // this.patient.registration.callingName = this.patient.registration.CallingName[0];
                // this.patient.registration.title = this.patient.registration.Title[0];


            //     console.log(this.patient);
            // });
        // });

        this.messageService.sendMessage('patientCareRecordLoaded', '');

    }


    resetPatient() {
        this.logger.debug(this.className + 'resetPatient()');

        this.patient.registration.title = '';
        this.patient.registration.callingName = '';
        this.patient.registration.familyName = '';
        this.patient.registration.nhsNumber = '';
        this.patient.registration.dateOfBirth = '';
        this.patientXML = null;
    }



    // ====================================================

    clearData() {
        this.docList.length = 0;
        this.recentPatientList.length = 0;
        this.alertList.length = 0;
        this.selectedPatient = null;
    }


    search(patient: any): Promise<any> {
        console.log(this.className + '.search() - params:', patient);

        try {
            // Initialize Params Object
            let Params = new HttpParams();

            if (patient.firstName != null && patient.firstName !== '') {
                Params = Params.append('firstName', patient.firstName);
            }
            if (patient.lastName != null && patient.lastName !== '') {
                Params = Params.append('lastName', patient.lastName);
            }
            if (patient.nhsNumber != null && patient.nhsNumber !== '') {
                Params = Params.append('nhsNumber', patient.nhsNumber);
            }
            if (patient.dateOfBirth != null && patient.dateOfBirth !== '') {
                Params = Params.append('dateOfBirth', patient.dateOfBirth);
            }
            if (patient.userId != null && patient.userId !== '') {
                Params = Params.append('userId', patient.userId);
            }

            return this.httpClient.get(environment.app.serverUrl + '/api/1/patient', { params: Params }).toPromise().then(
                response => {

                    return Promise.resolve(response);
                },
                error => {
                    console.log(this.className + '.getMetricList() - ERROR:', error);

                    return Promise.reject(error.message);
                }
            )
                .catch(
                    this.handleError
                );
        }
        catch (error) {
            console.log(this.className + '.search() - SERVER ERROR:', error);
        }
    }


    // getAppUserList(patientID: string) {
    //     console.log(this.className + '.getAppUserList() - patientID:' + patientID);

    //     try {
    //         return this.httpClient.get(environment.app.serverUrl + '/api/1/patient/' + patientID + '/appuser').map(
    //             response => {
    //                 console.log(this.className + '.getAppUserList() - SUCCESS:', response);

    //                 return response;
    //             },
    //             error => {
    //                 console.log(this.className + '.getAppUserList() - ERROR:', error);
    //                 return error;
    //             }
    //         )
    //         .catch(
    //             this.handleError
    //         );
    //     }
    //     catch (error) {
    //         console.log(this.className + '.getAppUserList() - SERVER ERROR:', error);
    //     }
    // }


    getMetricList(patientID: string, type: string): Promise<any> {
        console.log(this.className + '.getMetricList() - patientID:' + patientID + ' type:' + type);

        try {
            return this.httpClient.get(environment.app.serverUrl + '/api/1/patient/' + patientID + '/metric/' + type).toPromise().then(
                response => {
                    console.log(this.className + '.getMetricList() - SUCCESS:', response);
                    return Promise.resolve(response);
                },
                error => {
                    console.log(this.className + '.getMetricList() - ERROR:', error);
                    return Promise.reject(error.message);
                }
            )
                .catch(
                    this.handleError
                );
        }
        catch (error) {
            console.log(this.className + '.getMetricList() - SERVER ERROR:', error);
        }
    }


    getActionItem(patientID: string, limit?: string, offset?: string): Promise<any> {

        try {
            // Initialize Params Object
            let httpParams = new HttpParams();

            if (limit != null && limit !== '') {
                httpParams = httpParams.append('limit', limit);
            }
            if (offset != null && offset !== '') {
                httpParams = httpParams.append('offset', offset);
            }

            return new Promise((resolve, reject) => {

                this.httpClient.get(environment.app.serverUrl + '/api/1/action/' + patientID).toPromise().then(
                    (response: any) => {

                        this.docList.length = 0;
                        Array.prototype.push.apply(this.docList, response.data);

                        resolve(this.docList);
                    },
                    error => {
                        console.log(this.className + '.getActionItem() - ERROR:', error);

                        reject(true);
                    }
                )
                    .catch(
                        this.handleError
                    );
            });
        }
        catch (error) {
            console.log(this.className + '.getActionItem() - SERVER ERROR:', error);
        }
    }


    // getImmunisationByPatient(patientID) {
    //     console.log(this.className + '.getImmunisationByPatient()');

    //     const url = environment.app.serverUrl + '/api/1/patient/' + patientID + '/immunisation';

    //     return this.httpClient.get(url).map(
    //         (response: any) => {
    //             console.log(this.className + '.getImmunisationByPatient() - SUCCESS: ', response);

    //             this.immunisationList.length = 0;
    //             this.immunisationLookup = {};

    //                // Store Data From PouchDB in array
    //                for (let i = 0; i < response.data.length; i++) {

    //                 let tmpItem = response.data[i];
    //                 // tmpItem = Number((tmpItem + '').replace(/\D+/g, ''));

    //                 if (this.immunisationLookup[tmpItem.immunisation] == null) {
    //                     this.immunisationLookup[tmpItem.immunisation] = [];
    //                 }

    //                 this.immunisationLookup[tmpItem.immunisation].push(tmpItem);
    //             }

    //             for (var item in this.immunisationLookup) {

    //                 this.immunisationLookup[item].sort((a, b) => {
    //                     return Number(b.datetime) - Number(a.datetime);
    //                 });

    //                 this.immunisationList.push(this.immunisationLookup[item][0]);
    //             }

    //             // Do sorting
    //             this.immunisationList.sort((a, b) => {

    //                 if (!(Number(b.datetime) - Number(a.datetime))) {
    //                   return Number(b.datetime) - Number(a.datetime);
    //                 }

    //                 return Number(b.datetime) - Number(a.datetime);
    //             });

    //             return response;
    //         },
    //         error => {
    //             console.log(this.className + '.getImmunisationByPatient() - ERROR: ', error);

    //             return error;
    //         }
    //     );
    // }


    // getBloodTestByPatient(patientID) {
    //     console.log(this.className + '.getBloodTestByPatient()');

    //     let url = environment.app.serverUrl + '/api/1/patient/' + patientID + '/bloodtest'

    //     return this.httpClient.get(url).map(
    //         (response: any) => {
    //             console.log(this.className + '.getBloodTestByPatient() - SUCCESS: ', response);

    //             this.bloodTestList.length = 0;


    //             Array.prototype.push.apply(this.bloodTestList, response.data);

    //             return response;
    //         },
    //         error => {
    //             console.log(this.className + '.getBloodTestByPatient() - ERROR: ', error);

    //             return error;
    //         }
    //     );
    // }


    getAlert(actionID: string, limit?: string, offset?: string): Promise<any> {

        try {
            const key = actionID.split('::');

            if (!key[2]) {
                console.log(this.className + '.getAlert() - Unable to find action:');

                return;
            }

            // Initialize Params Object
            let httpParams = new HttpParams();

            if (limit != null && limit !== '') {
                httpParams = httpParams.append('limit', limit);
            }
            if (offset != null && offset !== '') {
                httpParams = httpParams.append('offset', offset);
            }

            return new Promise((resolve, reject) => {

                this.httpClient.get(environment.app.serverUrl + '/api/1/alert/' + key[2]).toPromise().then(
                    (response: any) => {

                        this.alertList.length = 0;
                        Array.prototype.push.apply(this.alertList, response.data);

                        resolve(this.alertList);
                    },
                    error => {
                        console.log(this.className + '.getAlert() - ERROR:', error);

                        reject(true);
                    }
                )
                    .catch(
                        this.handleError
                    );
            });
        }
        catch (error) {
            console.log(this.className + '.getAlert() - SERVER ERROR:', error);
        }

    }


    getImageList(patientID: string): Promise<any> {
        console.log(this.className + '.getImageList() - patientID:' + patientID);

        try {
            return new Promise((resolve, reject) => {

                this.httpClient.get(environment.app.serverUrl + '/api/1/patient/' + patientID + '/image').toPromise().then(
                    (response: any) => {
                        console.log(this.className + '.getImageList() - SUCCESS:', response);

                        this.docList.length = 0;
                        Array.prototype.push.apply(this.docList, response.data);

                        resolve(true);
                    },
                    error => {
                        console.log(this.className + '.getImageList() - ERROR:', error);

                        reject(true);
                    }
                )
                    .catch(
                        this.handleError
                    );
            });
        }
        catch (error) {
            console.log(this.className + '.getImageList() - SERVER ERROR:', error);
        }
    }


    getMedicalHistoryList(patientID: string): Promise<any> {
        console.log(this.className + '.getMedicalHistoryList() - patientID:' + patientID);
        try {
            return new Promise((resolve, reject) => {

                this.httpClient.get(environment.app.serverUrl + '/api/1/patient/' + patientID + '/medicalhistory').toPromise().then(
                    (response: any) => {
                        console.log(this.className + '.getMedicalHistoryList() - SUCCESS:', response);

                        this.docList.length = 0;
                        Array.prototype.push.apply(this.docList, response.data);

                        resolve(true);
                    },
                    error => {
                        console.log(this.className + '.getMedicalHistoryList() - ERROR:', error);

                        reject(error);
                    }
                )
                    .catch(
                        this.handleError
                    );
            });
        }
        catch (error) {
            console.log(this.className + '.getImageList() - SERVER ERROR:', error);
        }
    }


    getMedicineList(patientID: string): Promise<any> {
        console.log(this.className + '.getMedicineList() - patientID:' + patientID);

        try {

            return new Promise((resolve, reject) => {

                this.httpClient.get(environment.app.serverUrl + '/api/1/patient/' + patientID + '/medicine').toPromise().then(
                    (response: any) => {
                        console.log(this.className + '.getMedicineList() - SUCCESS:', response);

                        this.docList.length = 0;
                        Array.prototype.push.apply(this.docList, response.data);

                        resolve(true);
                    },
                    error => {
                        console.log(this.className + '.getMedicineList() - ERROR:', error);

                        reject(error);
                    }
                )
                    .catch(
                        this.handleError
                    );
            });
        }
        catch (error) {
            console.log(this.className + '.getMedicineList() - SERVER ERROR:', error);
        }
    }


    getAllergiesList(patientID: string): Promise<any> {
        console.log(this.className + '.getAllergiesList() - patientID:' + patientID);
        try {

            return new Promise((resolve, reject) => {
                this.httpClient.get(environment.app.serverUrl + '/api/1/patient/' + patientID + '/allergies').toPromise().then(
                    (response: any) => {
                        console.log(this.className + '.getAllergiesList() - SUCCESS:', response);

                        this.docList.length = 0;
                        Array.prototype.push.apply(this.docList, response.data);

                        resolve(true);
                    },
                    error => {
                        console.log(this.className + '.getAllergiesList() - ERROR:', error);

                        reject(error);
                    }
                )
                    .catch(
                        this.handleError
                    );
            });
        }
        catch (error) {
            console.log(this.className + '.getAllergiesList() - SERVER ERROR:', error);
        }
    }


    linkDevice(body): Promise<any> {
        console.log(this.className + '.linkDevice() - params:', body);

        try {
            return this.httpClient.post(environment.app.serverUrl + '/api/1/device/link', body).toPromise().then(
                data => {
                    console.log(this.className + '.linkDevice() - SUCCESS:', data);

                    //TODO: only update the one device record
                    // this.deviceService.getAll().subscribe();

                    return Promise.resolve(data);
                },
                error => {
                    console.log(this.className + '.linkDevice() - ERROR:', error);

                    return Promise.reject(error.message);
                }
            )
                .catch(
                    this.handleError
                );
        }
        catch (error) {
            console.log(this.className + '.linkDevice() - SERVER ERROR:', error);
        }
    }


    unlinkDevice(deviceId: string): Promise<any> {
        console.log(this.className + '.unlinkDevice() - deviceId:' + deviceId);

        try {
            const url = environment.app.serverUrl + '/api/1/device/link/' + deviceId;

            return this.httpClient.delete(url).toPromise().then(
                response => {
                    console.log(this.className + '.unlinkDevice() - SUCCESS:', response);

                    // TODO: only update the one device record
                    //this.deviceService.getAll().subscribe();

                    return Promise.resolve(response);
                },
                error => {
                    console.log(this.className + '.unlinkDevice() - ERROR:', error);
                    return Promise.reject(error.message);
                }
            )
                .catch(
                    this.handleError
                );
        }
        catch (error) {
            console.log(this.className + '.unlinkDevice() - SERVER ERROR:', error);
        }
    }


    getLinkedDeviceList(patientID: string): Promise<any> {
        console.log(this.className + '.getLinkedDeviceList()');

        try {
            return new Promise((resolve, reject) => {
                try {
                    this.httpClient.get(environment.app.serverUrl + '/api/1/patient/' + patientID + '/devices').subscribe(
                        (response: any) => {
                            console.log(this.className + '.getLinkedDeviceList() - SUCCESS:', response);

                            this.docList.length = 0;
                            Array.prototype.push.apply(this.docList, response.data);

                            resolve(true);
                        },
                        (error) => {
                            console.log(this.className + '.getLinkedDeviceList() - ERROR:', error);

                            reject(true);
                        }
                    );
                }
                catch (error) {
                    console.log(this.className + '.getDeviceList() - error: ', error);

                    reject(true);
                }
            });
        }
        catch (error) {
            console.log(this.className + '.getLinkedDeviceList() - SERVER ERROR:', error);
        }
    }


    getAll(): Promise<any> {
        console.log(this.className + '.getAll()');

        try {
            return this.httpClient.get(environment.app.serverUrl + '/api/1/patient').toPromise().then(
                response => {
                    console.log(this.className + '.getAll() - SUCCESS:', response);
                    return Promise.resolve(response);
                },
                error => {
                    console.log(this.className + '.getAll() - ERROR:', error);

                    return Promise.reject(error.message);
                }
            )
                .catch(
                    this.handleError
                );
        }
        catch (error) {
            console.log(this.className + '.getAll() - SERVER ERROR:', error);
        }
    }


    getMessages(patientID: string): Promise<any> {
        console.log(this.className + '.getMessages() - patientID:' + patientID);

        return new Promise((resolve, reject) => {
            return this.httpClient.get(environment.app.serverUrl + '/api/1/messages/' + patientID).toPromise().then(
                (response: any) => {
                    console.log(this.className + '.getMessages() - SUCCESS:', response);

                    this.docList = response.data;

                    resolve(true);
                },
                error => {
                    console.log(this.className + '.getMessages() - ERROR:', error);

                    reject(error.message);
                }
            )
                .catch(
                    this.handleError
                );
        });
    }


    async sendMessage(body: any) {
        console.log(this.className + '.getMessages() - patientID:' + body);

        return new Promise((resolve, reject) => {
            return this.httpClient.post(environment.app.serverUrl + '/api/1/message', body).toPromise().then(
                (response: any) => {
                    this.docList = response.data;

                    resolve(true);
                },
                error => {
                    console.log(this.className + '.sendMessage() - ERROR:', error);

                    reject(error.message);
                }
            )
                .catch(
                    this.handleError
                );
        });
    }


    private handleError(error: Response | any) {
        console.error(error.message || error);
//TODO Investigate throwerror issue
        return null; //Observable.throwError(error.message || error);
    }

}
