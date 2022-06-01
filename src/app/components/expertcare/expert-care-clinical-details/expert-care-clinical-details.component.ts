import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-expert-care-clinical-details',
  templateUrl: './expert-care-clinical-details.component.html',
  styleUrls: ['./expert-care-clinical-details.component.scss']
})
export class ExpertCareClinicalDetailsComponent implements OnInit {
    translation;
    env = environment;

  constructor(private translate: TranslateService) {

        }

  listOne = [

    {
        col1: "Excluded Comorbidity",
        col2: "Reasons for previous exclusion from decision process",
        col3: "Unclick to remove Exclusion",
        children: [
            { name: "None", remarks: "No overridden codes",  }]
    },
    {
        col1: "Relevant Comorbidity",
        col2: "Remarks",
        col3: "Click to Exclude",
        children: [
            { name: "Angina (IHD)", remarks: "Last date recorded: 2019/11/27", checked: false },
            { name: "Angiodema", remarks: "Last date recorded: 2019/03/01", checked: false } ]
    }
]

ngOnInit() {
}
}
