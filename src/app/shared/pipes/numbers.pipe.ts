import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numbers'})
export class NumbersPipe implements PipeTransform {
    transform (input:number) {

        // Do display break up
        let displayValue = input + "";
        for (let char = 0; char < displayValue.length; char++) {
            let value = displayValue[char];

            if (char == 2 || char == 6) {
                displayValue = displayValue.substr(0, char) + value + ' ' + displayValue.substr(char + 1);
            }
        }

        return displayValue;
    }
}
