import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-security',
  templateUrl: './register-security.component.html',
  styleUrls: ['./register-security.component.scss']
})
export class RegisterSecurityComponent implements OnInit {

    questionList1: Array<{ question: string }> = [
        { question: 'Option 1' },
        { question: 'Option 2' },
        { question: 'Option 3' }
    ];

    questionList2: Array<{ question: string }> = [
        { question: 'Option 1' },
        { question: 'Option 2' },
        { question: 'Option 3' }
    ];

    questionList3: Array<{ question: string }> = [
        { question: 'Option 1' },
        { question: 'Option 2' },
        { question: 'Option 3' }
    ];
  constructor() { }

  ngOnInit(): void {
  }

}
