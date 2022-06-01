import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import nunjucks from 'nunjucks';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';

import { MessageService } from '../../shared/services/message.service';
import { UserService } from '../user/user.service';
import { PatientService } from '../patient/patient.service';

import { templates } from './expertcare-templates';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ExpertcareService {
  subscription: Subscription;
  public currentToken = '';
  public isReloaded = false;
  public messageContent: any;
  public messageContentParsed: any;
  public productVersion: string;
  private className = 'ExpertcareService';
  constructor(
    private logger: NGXLogger,
        private httpClient: HttpClient,
        private messageService: MessageService,
        private userService: UserService,
        private patientService: PatientService) {
        this.logger.debug(this.className + '.constructor()');

        this.subscription = this.messageService.getMessage().subscribe(message => {

            switch (message.subject) {

                case 'printerSelected':
                    this.logger.debug(this.className + '.getMessage:', message.subject, message.text);

                    this.print(JSON.parse(message.text));

                    break;
            }
        });

    }


    setMessage(message: any) {
        this.logger.debug(this.className + '.setMessage()');

        this.messageContent = message;

        // This fixes BAD ExpertCare JSON
        this.messageContent.data.PrescribingRecommendations.ContinuedMeds.MedList.forEach(element => {
            element.DrugInfo = this.jsonBuilder(element.DrugInfo);
        });
        this.messageContent.data.PrescribingRecommendations.StartedMeds.MedList.forEach(element => {
            element.DrugInfo = this.jsonBuilder(element.DrugInfo);
        });

        this.messageContentParsed = this.pdfContentBuilder();
    }


    sendPatientXmlToExpertCare(practiceCS: string, practiceID: string, practitionerID: string ): Observable<any> {
        console.log(this.className + '.sendPatientXmlToExpertCare()', practiceCS, practiceID, practitionerID );

        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const url = environment.app.urlExpertCareAPI;

        const jsonData = {
            PracticeID: practiceID,
            PracticeCS: practiceCS,
            PractitionerID: practitionerID,
            Payload: this.patientService.patientXML
        };

        return this.httpClient.post(url, jsonData, { headers })
            .pipe(map(
                data => {
                    console.log("Response from ExpertCare: ", data);
                    return data;
                },
                error => {
                console.log(error);
                //alert(error);
                }
            )
        )
    }

    print(printerParam: any) {
        this.logger.debug(this.className + '.print()', printerParam);

        const params = {
            htmlContent: this.messageContentParsed,
            fileName: 'filename.pdf',
            printer: printerParam
        }

        this.messageService.sendMessage('pdfPrint', JSON.stringify(params));
    }


    saveFile() {
        this.logger.debug(this.className + '.saveFile()');

        const params = {
            htmlContent: this.messageContentParsed,
            fileName: 'axon-' + new Date().getTime(),
            fileOptions: {
                title: 'Save PDF',
                defaultPath: `EC ${this.patientService.patient.registration.title} ${this.patientService.patient.registration.callingName} ${this.patientService.patient.registration.familyName} (${this.patientService.patient.registration.nhsNumber}).pdf`,
                buttonLabel: "Save Change Request",
                filters: [
                    { name: 'PDFs', extensions: ['pdf'] }
                ]
            }
        }
        this.logger.debug('RIAAN : ' + JSON.stringify(params));
        this.messageService.sendMessage('pdfSaveAs', JSON.stringify(params));
    }


    saveToPatientRecord() {
        this.logger.debug(this.className + '.saveToPatientRecord()');

        const params = {
            filename: 'temporary',
            htmlContent: this.messageContentParsed,
            dbID: this.patientService.patient.dbID,
            nhsNumber: this.patientService.patient.registration.nhsNumber,
            contenttitle: 'Patient consultation',
            contentdescription: this.patientService.patient.documents.contentdescription,
            contentfilename: this.patientService.patient.documents.contentfilename,
            clientlocationname: this.patientService.patient.documents.clientlocationname,
            clientlocationtype: this.patientService.patient.documents.clientlocationtype
        }



        this.messageService.sendMessage('pdfSaveToPatientRecord', JSON.stringify(params));
    }


    pdfContentBuilder(): string {
        this.logger.debug(this.className + '.pdfContentBuilder()', this.messageContent);

        const address = this.patientService.patient.registration.address;

        let addressFull = '';

        if(address.houseNameFlat !== '') {
            addressFull = address.houseNameFlat;
        }
        if(address.street !== '') {
            addressFull += addressFull != ''? ', ' + address.street: address.street;
        }
        if(address.village !== '') {
            addressFull += addressFull != ''? ', ' + address.village: address.village;
        }
        if(address.town !== '') {
            addressFull += addressFull != ''? ', ' + address.town: address.town;
        }
        if(address.county !== '') {
            addressFull += addressFull != ''? ', ' + address.county: address.county;
        }
        if(address.postCode !== '') {
            addressFull += addressFull != ''? ', ' + address.postCode: address.postCode;
        }

        const telephoneList = ''; // patient.telephoneHome, patient.telephoneMobile

        const templateData = {
            dateTime: moment().format('DD-MMM-yyyy'),
            // dateTime: moment().format('dd-MMM-yyyy - HH:MM:SS'),
            appointmentInMonths: 3,
            site: {
                name: `${this.userService.user.locationName} (${this.userService.user.locationCode})`,
                address: '',
                telephone: ''
            },
            practitioner: {
                fullName: this.userService.user.userDisplay,
                role: ''
            },
            excludedCPs: this.messageContent.data.ClinicalDetails.ExcludedCPs,
            activeCPs: this.messageContent.data.ClinicalDetails.ActiveCPs,
            patient: {
                // callingName: this.patientService.patient.registration.callingName,
                // familyName: this.patientService.patient.registration.familyName,
                // nhsNumber: this.patientService.patient.registration.nhsNumber,
                // dateOfBirth: this.patientService.patient.registration.dateOfBirth,
                // gender: this.patientService.patient.registration.gender,
                // telephoneList: telephoneList,
                // address: addressFull
                callingName: 'NOT RECEIVED',
                familyName: 'NOT RECEIVED',
                nhsNumber: 'NOT RECEIVED',
                dateOfBirth: 'NOT RECEIVED',
                telephoneList: 'NOT RECEIVED',
                address: 'NOT RECEIVED',
                age: this.messageContent.data.Patient.Age,
                ageYear: this.messageContent.data.Patient.AgeYear,
                bp: this.messageContent.data.Patient.BP,
                bpDate: moment(this.messageContent.data.Patient.BPDate, 'YYYY/MM/DDTHH:mm:ss').format('DD/MM/YYYY'),
                bpType: this.messageContent.data.Patient.BPType,
                bpValue: this.messageContent.data.Patient.BPValue,
                ethnicity: this.messageContent.data.Patient.Ethnicity,
                gender: this.messageContent.data.Patient.Gender,
                key: this.messageContent.data.Patient.key
                // status: this.messageContent.data.Patient.BPType + '\t' +
                //         this.messageContent.data.Patient.BPValue + '\t' +
                //         this.messageContent.data.Patient.BPDate + '\t' +
                //         this.messageContent.data.Patient.Gender + '\t' +
                //         this.messageContent.data.Patient.Ethnicity + '\t' +
                //         this.messageContent.data.Patient.Age
            },

            data: this.messageContent.data
        };

        this.logger.debug(this.className + '.pdfContentBuilder() - TEMPLATE-DATA', templateData);
        this.logger.debug(JSON.stringify(templateData));

        const result = nunjucks.renderString(templates.expertcareMedicineChange, templateData);

        this.logger.debug(this.className + '.pdfContentBuilder() - TEMPLATE-PARSED', result);

        this.logger.debug('Template data : ' + templateData.data);

        return result;
    }


    /**
     * Helper function to clean bad JSON from ExpertCare
     * @param drugInfo
     * @returns json
     */
    jsonBuilder(drugInfo) {

        const drugInfoTmp = [];

        for (const key in drugInfo) {
            const keyTmp = key.includes('Recommend')? 'Recommendation': key;

            let obj = {
                type: keyTmp,
                items: []
            }

            if (typeof drugInfo[key] === 'string') {
                obj.items.push(drugInfo[key]);
            } else {
                for (const item in drugInfo[key]) {
                    obj.items.push(`<b>${item}</b> ${drugInfo[key][item]}`);
                }
            }

            drugInfoTmp.push(obj);
        }

        return drugInfoTmp;
    }
}
