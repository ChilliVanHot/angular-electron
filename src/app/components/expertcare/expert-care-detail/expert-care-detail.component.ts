import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { isNgTemplate } from '@angular/compiler';
import { waitForAsync } from '@angular/core/testing';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-expert-care-detail',
    templateUrl: './expert-care-detail.component.html',
    styleUrls: ['./expert-care-detail.component.scss']
})
export class ExpertCareDetailComponent implements OnInit {
  translation;
  env = environment;

  isOpenPatientDetails = true;
  isOpenPathwayComorbidities = true;

  isOpenNonPathwayComorbidities = true;
  isOpenCurrentHypertensionTreatment = true;
  isOpenOtherRelevantMedication = true;

  pathwayComorbidities = [
    {
      name: "Diabetes",
      checked: false
    },
        {
            name: "Proteinuria (ACR > 30)",
            checked: false
        },
        {
            name: "Atrial Fibrilation or SVT",
            checked: false
          },
          {
            name: "Angina (IHD)",
            checked: false
          },
          {
            name: "MI under 1 yr",
            checked: false
          },
        {
          name: "MI over 1 yr",
            checked: false
        },
        {
            name: "Heart Failure",
            checked: false
        }

    ]
    nonPathwayComorbidities = [

        {
            section: "Cardiovascular",
            id: "heading-1-31",
            children: [
              { name: "Angina vasosspasm", checked: false },
                { name: "Cardiomyopathy", checked: false }]
        },
        {
            section: "Digestive System and Abdomen",
            id: "heading-1-32",
            children: [
                { name: "Option 1", checked: false },
                { name: "Option 2", checked: false }]
        },
        {
          section: "Endocrine and Metabolic",
          id: "heading-1-33",
          children: [
                { name: "Option 1", checked: false },
                { name: "Option 2", checked: false }]
        },
        {
            section: "Head & Neck and Neurological",
            id: "heading-1-34",
            children: [
              { name: "Option 1", checked: false },
              { name: "Option 2", checked: false }]
        },
        {
            section: "Musculoskeletal and Skin",
            id: "heading-1-35",
            children: [
                { name: "Connective tissue disease", checked: false },
                { name: "Psoriasis", checked: false },
                { name: "Systemic lupus erythematosus", checked: false }]
        },
        {
          section: "Renal Tract",
          id: "heading-1-36",
            children: [
              { name: "Option 1", checked: false },
              { name: "Option 2", checked: false }]
        },
        {
          section: "Respiratory",
            id: "heading-1-37",
            children: [
              { name: "Asthma", checked: false },
                { name: "COPD", checked: false }]
              }
    ]

    currentHypertensionTreatment = [

        {
            section: "ACE Inhibitor (ACE-i)",
            id: "heading-1-51",
            children: [
                { name: "Option 1", checked: false },
                { name: "Option 2", checked: false }]
              },
        {
          section: "Aldosterone Antagonist (AA)",
          id: "heading-1-52",
          children: [
                { name: "Spironolactone", checked: false },
                { name: "Eplernone", checked: false }]
        },
        {
          section: "Alpha Blocker (AB)",
          id: "heading-1-53",
            children: [
                { name: "Option 1", checked: false },
                { name: "Option 2", checked: false }]
        },
        {
          section: "Angiotesin Receptor Blocker (ARB)",
          id: "heading-1-54",
            children: [
                { name: "Azilsartan", checked: false },
                { name: "Candesartan", checked: false },
                { name: "Eprosartan", checked: false },
                { name: "Irbesartan", checked: false },
                { name: "Losartan", checked: false },
                { name: "Olmesartan", checked: false },
                { name: "Telmisartan", checked: false },
                { name: "Valsartan", checked: false }]
        },
        {
          section: "Beta Blocker (BB)",
          id: "heading-1-55",
          children: [
            { name: "Option 1", checked: false },
                { name: "Option 2", checked: false }]
        },
        {
            section: "Calcium Channel Blocker (CCB)",
            id: "heading-1-56",
            children: [
                { name: "Option 1", checked: false },
                { name: "Option 2", checked: false }]
        },
        {
            section: "Centrally Acting",
            id: "heading-1-57",
            children: [
              { name: "Option 1", checked: false },
                { name: "Option 2", checked: false }]
              },
              {
            section: "Loop Diuretic",
            id: "heading-1-58",
            children: [
                { name: "Option 1", checked: false },
                { name: "Option 2", checked: false }]
        },
        {
          section: "Renin Inhibitor",
            id: "heading-1-59",
            children: [
                { name: "Option 1", checked: false },
                { name: "Option 2", checked: false }]
        }, {
            section: "Thiazide",
            id: "heading-1-60",
            children: [
                { name: "Option 1", checked: false },
                { name: "Option 2", checked: false }]
        },
        {
          section: "Vasodilator",
            id: "heading-1-61",
            children: [
              { name: "Option 1", checked: false },
                { name: "Option 2", checked: false }]
        }

    ]

    otherRelevantMedication = [

      {
        id: "heading-1-71",
        section: "Drugs Affecting Conduction",
        isOpen: false,
        children: [
          { name: "Option 1", checked: false },
          { name: "Option 2", checked: false }]
        },
        {
          id: "heading-1-72",
          section: "Potassium Sparing Diuretics",
          isOpen: false,
            children: [
                { name: Option 1', checked: false },
                { name: "Option 2", checked: false }]
        }
    ];

    private functionName = 'ExpertCareDetailComponent.';

    constructor(private logger: NGXLogger,
        private translate: TranslateService) {


        this.logger.debug(this.functionName + 'constructor()');


    }


    ngOnInit() {
      this.logger.debug(this.functionName + 'ngOnInit()');
    }


    doTogglePatientDetails() {
        this.logger.debug(this.functionName + 'doTogglePatientDetails()', this.isOpenPatientDetails);

        this.isOpenPatientDetails = !this.isOpenPatientDetails;
    }

    doTogglePathwayComorbidities() {
        this.logger.debug(this.functionName + 'doTogglePathwayComorbidities()', this.isOpenPathwayComorbidities);

        this.isOpenPathwayComorbidities = !this.isOpenPathwayComorbidities;
    }
    doToggleNonPathwayComorbidities() {
        this.logger.debug(this.functionName + 'doToggleNonPathwayComorbidities()', this.isOpenNonPathwayComorbidities);

        this.isOpenNonPathwayComorbidities = !this.isOpenNonPathwayComorbidities;
    }
    doToggleCurrentHypertensionTreatment() {
        this.logger.debug(this.functionName + 'doToggleCurrentHypertensionTreatment()', this.isOpenCurrentHypertensionTreatment);

        this.isOpenCurrentHypertensionTreatment = !this.isOpenCurrentHypertensionTreatment;
    }
    doToggleOtherRelevantMedication() {
        this.logger.debug(this.functionName + 'doToggleOtherRelevantMedication()', this.isOpenOtherRelevantMedication);

        this.isOpenOtherRelevantMedication = !this.isOpenOtherRelevantMedication;
    }

    toggleNonPathwayComorbilities(item: any) {
        this.logger.debug(this.functionName + 'toggleNonPathwayComorbilities()');

        item.isOpen = !item.isOpen;
    }

    toggleCurrentHypertensionTreatment(item: any) {
        this.logger.debug(this.functionName + 'toggleCurrentHypertensionTreatment()');

        item.isOpen2 = !item.isOpen2;
    }

    toggleotherRelevantMedication(item: any) {
        this.logger.debug(this.functionName + 'toggleotherRelevantMedication()');

        item.isOpen3 = !item.isOpen3;
    }


}
