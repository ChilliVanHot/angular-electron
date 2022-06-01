import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-expert-care-medication',
  templateUrl: './expert-care-medication.component.html',
  styleUrls: ['./expert-care-medication.component.scss']
})
export class ExpertCareMedicationComponent implements OnInit {
    translation;
    env = environment;

    listOne = [
      // {
      //     col1: "Drug Class",
      //     col2: "Drug",
      //     col3: "Currently Taken",
      //     children: [
      //         { name: "Calcium Channel Blocker: Non-rate-limiting", remarks: "Amlodipine", checked: false  }]
      // },
    ];

  listTwo = [
      // {
      //     col1: "Drug Class",
      //     col2: "Reason",
      //     col3: "Excluded",
      //     children: [
      //         { name: "Beta Blocker", remarks: "Contraindicated by Angina vasospasm", checked: false  }]
     // },
  ];
  constructor(private translate: TranslateService) {

         }
  ngOnInit() {
  }

}
