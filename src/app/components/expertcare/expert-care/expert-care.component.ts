import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-expert-care',
  templateUrl: './expert-care.component.html',
  styleUrls: ['./expert-care.component.scss']
})
export class ExpertCareComponent implements OnInit {
    translation;
    env = environment;

  constructor(private route: ActivatedRoute,
     private translate: TranslateService) {

         }

  ngOnInit() {
  }

}
