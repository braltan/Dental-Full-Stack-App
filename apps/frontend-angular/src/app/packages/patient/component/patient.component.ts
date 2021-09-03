import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient } from '@dental-full-stack-app/models';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ExportService } from '../../util/exportService.service';
import { LanguageMessagesService } from '../../util/languageMessagesService';
import { PatientService } from '../service/patient.service';


@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    providers: [ConfirmationService]
}
)
export class PatientComponent implements OnInit {
    patientColumns: String[] = ['name','surname','tcId','phoneNumber','address','totalFee'];
    selectableColumns: SelectItem[] = [];
    patientList:Patient[];
    patient:Patient = new Patient();
    _selectedColumns: String[];
    panelVisible:boolean = false;
    paymentVisible:boolean = false;
    isUpdate: boolean = false;
    @ViewChild("exampleForm") eform:NgForm;
    @ViewChild("tableId") tableId: Table;

    constructor(
        private patientService: PatientService,
        private languageMessagesService: LanguageMessagesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private exportService: ExportService
    ) {  
    this.patientColumns.forEach((element) => {
        const selectable: SelectItem = { label: element + '', value: element };
        this.selectableColumns.push(selectable);
      });
      this.selectedColumns = [];
      this.selectableColumns.map((item) => this.selectedColumns.push(item.value));

    }
    ngOnInit() {
       
       this.patientService.findAll().subscribe(res =>{
           this.patientList = res;
       })
      
    }
    delete(patient: Patient) {
        this.confirmationService.confirm({
            key:'delete',
            accept: () => {
                this.patientService.delete(patient._id).subscribe(
                    () => {
                        this.ngOnInit();
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        });
    }
    update(patient: Patient){
        this.patient = patient;
        this.panelVisible = true;
        this.isUpdate = true;
    }
    add() {
        this.isUpdate = false;
        this.panelVisible = true;
    }
    cancel(){
        this.panelVisible = false;
        this.patient = new Patient();
        this.eform.resetForm();
        this.ngOnInit();
    }
    openPaymentList(patient:Patient) {
        this.patient = patient;
        this.paymentVisible = true;
    }

    save(form:NgForm) {
        this.patientService.save(this.patient).subscribe(
            () => {
                this.messageService.clear();
                this.panelVisible = false;
                this.patient = new Patient();
                this.eform.resetForm();
                this.ngOnInit();
            },
            err => {
                if(err.status == 500)
                {
                this.messageService.clear();
                this.messageService.add({severity:'error', summary:'', detail:this.languageMessagesService.msgjson.name + ' ' + this.languageMessagesService.msgjson.exists});
                }
            }
        );
    }

    getRemainingFee(patient:Patient) {
        let paidFee = 0;
        if(patient.paymentList)
        patient.paymentList.forEach(payment => {
            paidFee+=payment.amount;
        });
       return patient.totalFee - paidFee;
    }

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
      }
      set selectedColumns(val: any[]) {
        // restore original order
        this._selectedColumns = this.patientColumns.filter(col => val.includes(col));
      }
      exportToPDF() {
        if(this.tableId.filteredValue != undefined && this.tableId.filteredValue != null)
        this.exportService.exportPdf(this.selectedColumns, this.tableId.filteredValue, this.languageMessagesService.msgjson.patient+ ' '
         + this.languageMessagesService.msgjson.list +'.pdf');
        else {
            this.exportService.exportPdf(this.selectedColumns, this.patientList,this.languageMessagesService.msgjson.patient+ ' '
            + this.languageMessagesService.msgjson.list +'.pdf');
        }
    }

    exportToExcel() {
        if(this.tableId.filteredValue != undefined && this.tableId.filteredValue != null)
        this.exportService.exportAsExcelFile(this.selectedColumns, this.tableId.filteredValue, this.languageMessagesService.msgjson.patient+ ' '
        + this.languageMessagesService.msgjson.list +'.xlsx');
        else{
        this.exportService.exportAsExcelFile(this.selectedColumns, this.patientList, this.languageMessagesService.msgjson.patient+ ' '
        + this.languageMessagesService.msgjson.list +'.xlsx');
        }
    } 
}
