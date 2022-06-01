import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CommonModalComponent } from '../../../application/modals/common-modal/common-modal.component';

import { UserService } from '../../user/user.service';
import { FeedbackService } from '../feedback.service';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  loading = false;
  feedbackForm: FormGroup;
  private className = 'FeedbackComponent';

    constructor(private logger: NGXLogger,
                private formBuilder: FormBuilder,
                private modalService: NgbModal,
                private feedbackService: FeedbackService,
                public userService: UserService) {
        this.logger.debug(this.className + '.constructor()');

        this.feedbackForm = this.formBuilder.group({
            subject: ['', [Validators.required, Validators.minLength(2)]],
            emailAddress: ['', [Validators.required, Validators.email]],
            message: ['', [Validators.required, Validators.minLength(2)]]
        });
    }


    ngOnInit() {
        this.logger.debug(this.className + '.ngOnInit()');
    }


    doSubmit(feedbackForm: FormGroup) {
        this.logger.debug(this.className + '.doSubmit()', feedbackForm.valid);
        this.logger.debug(this.className + '.doSubmit()', feedbackForm.value);

        const params = feedbackForm.value;
        params.locationCode = this.userService.user.locationCode;
        params.locationName = this.userService.user.locationName;
        params.userDisplay = this.userService.user.userDisplay;
        params.userName = this.userService.user.userName;

        this.feedbackService.sendFeedback(params).subscribe(
            data => {
                this.logger.debug(this.className + '.doSubmit() - SUCCESS', data);

                feedbackForm.reset();
                this.showModal('Information', 'Feedback sent successfully!');
            },
            error => {
                this.logger.debug(this.className + '.doSubmit() - ERROR', error);

                this.showModal('Error', error.message);
            }
        );
    }


    showModal(title: string, content: string) {
        this.logger.debug(this.className + '.showModal()', title, content);

        const modalRef = this.modalService.open(CommonModalComponent);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.content = content;
        modalRef.result.then(
            (result) => {
                console.log('result', result);
                //this.modalCloseResult = `Closed with: ${result}`;
            },
            (reason) => {
                console.log('reason', reason);
                // console.log(this.getDismissReason(reason));
            }
        );
    }

}
