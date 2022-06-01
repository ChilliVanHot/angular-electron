import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-register-pin',
  templateUrl: './register-pin.component.html',
  styleUrls: ['./register-pin.component.scss']
})
export class RegisterPinComponent implements OnInit {
    translation;
    env = environment;
  constructor(private translate: TranslateService) {

      }

  ngOnInit(): void {
  }

}
