import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient, Payment } from '@dental-full-stack-app/models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PatientService } from '../../patient/service/patient.service';
import { LanguageMessagesService } from '../../util/languageMessagesService';


@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    providers: [ConfirmationService]
}
)
export class PaymentComponent  implements OnInit {
    paymentColumns: String[] = ['date','amount'];
    payment:Payment = new Payment();
    panelVisible:boolean = false;
    @ViewChild("paymentForm") eform:NgForm;
    @ViewChild("tableId") tableId: Table;
    @Input() patient: Patient;

    constructor(
        private languageMessagesService: LanguageMessagesService,
        private messageService: MessageService,
        private patientService:PatientService,
        private confirmationService: ConfirmationService
    ) {  
    }
    ngOnInit(): void {
     
    }

    delete(payment: Payment) {
        this.confirmationService.confirm({
            key:'delete',
            accept: () => {
                this.patient.paymentList = this.patient.paymentList.filter(item => item !== payment);
              this.patientService.save(this.patient).subscribe(
                () => {
                    this.messageService.clear();
                    this.panelVisible = false;
                    this.payment = new Payment();
                    this.eform.resetForm();

                },
                err => {}  
              );
            }
        });
    }
    add() {
        this.panelVisible = true;
    }

    save(form:NgForm) {
       if(!this.patient.paymentList)
        this.patient.paymentList = [];
        
        this.patient.paymentList.push(this.payment);
        this.patientService.save(this.patient).subscribe(
            () => {
                this.messageService.clear();
                this.panelVisible = false;
                this.payment = new Payment();
                this.eform.resetForm();
            },
            err => {}
        );
    }
}
