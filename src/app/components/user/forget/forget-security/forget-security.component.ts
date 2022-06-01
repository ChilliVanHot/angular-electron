import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-forget-security',
  templateUrl: './forget-security.component.html',
  styleUrls: ['./forget-security.component.scss']
})
export class ForgetSecurityComponent implements OnInit {
    translation;
    env = environment;
  constructor(private translate: TranslateService) {

      }

  ngOnInit(): void {
  }

}
