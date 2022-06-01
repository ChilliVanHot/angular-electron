import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

 static MatchPassword(AC: AbstractControl) {
  let password = AC.get('password').value; // to get value in input tag
  let confirmPassword = AC.get('verifyPassword').value; // to get value in input tag
  if(password != confirmPassword) {

   AC.get('verifyPassword').setErrors( {MatchPassword: true} )
  } else {

   return null
  }
 }
}
