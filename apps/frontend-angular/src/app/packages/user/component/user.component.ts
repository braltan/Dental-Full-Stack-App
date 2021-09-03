import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@dental-full-stack-app/models';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ExportService } from '../../util/exportService.service';
import { LanguageMessagesService } from '../../util/languageMessagesService';
import { UserService } from '../service/user.service';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    providers: [ConfirmationService]
}
)
export class UserComponent implements OnInit {
    userColumns: String[] = ['fullName','username'];
    selectableColumns: SelectItem[] = [];
    _selectedColumns: String[];
    userList: User[];
    user: User = new User();
    panelVisible:boolean = false;
    passwordPanelVisible:boolean = false;
    isUpdate: boolean = false;
    currentUser:User;
    @ViewChild("tableId") tableId: Table;
    @ViewChild("exampleForm") eform:NgForm;
    @ViewChild("changePassForm") passform:NgForm;

    newPassword: string;

    constructor(
        private userService: UserService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private languageMessagesService: LanguageMessagesService,
        private router: Router,
        private exportService: ExportService
    ) {  
      /*  this.userService.getCurrentUser().then(
            currentUser => this.currentUser=currentUser
        )*/
    this.userColumns.forEach((element) => {
        const selectable: SelectItem = { label: element + '', value: element };
        this.selectableColumns.push(selectable);
      });

      this.selectedColumns = [];
      this.selectableColumns.map((item) => this.selectedColumns.push(item.value));

    }
    ngOnInit() {
       this.userService.findAll().subscribe(res =>{
           this.userList = res;
       })

    }
   
    delete(user: User) {
        this.confirmationService.confirm({
            key:'delete',
            accept: () => {
                    this.userService.delete(user._id).subscribe(
                        res => {
                            this.ngOnInit();
                        },
                        err => {
                            console.log(err);
                        }
                    );
                }
            
        });
    }

    showPasswordPanel(user:User) {
        this.user = user;
        this.newPassword = "";
        this.passform.resetForm();
        this.passwordPanelVisible = true;
    }
    update(user: User){
        this.user = user;
        this.panelVisible = true;
        this.isUpdate = true;
    }
    add() {
        this.isUpdate = false;
        this.panelVisible = true;
    }
    cancel(){
        this.panelVisible = false;
        this.user = new User();
        this.eform.resetForm();
        this.ngOnInit();
    }
    back() {
      //  this.router.navigateByUrl('/settings');
    }
  
    changePass(ngForm:NgForm) {
        this.userService.changePassword({
            _id: this.user._id,
            password: this.newPassword
        }).subscribe(
            ()=> {
                this.passwordPanelVisible = false;
                this.user = new User();
                this.ngOnInit();
            }
        );

    }
    cancelChangePass() {
        this.passwordPanelVisible = false;
        this.user = new User();
        this.passform.resetForm();
        this.ngOnInit();
    }
    save(ngForm:NgForm) {
        if(!this.isUpdate) {
        this.userService.register(this.user).subscribe(
            () => {
                this.messageService.clear();
                this.eform.resetForm();
                this.panelVisible = false;
                this.user = new User();
                this.ngOnInit();
            
            },
               err => {
                if(err.status == 500)
                {
                this.messageService.clear();
                this.messageService.add({severity:'error', summary:'', detail:this.languageMessagesService.msgjson.username + ' ' + this.languageMessagesService.msgjson.exists});
                }
            }

        );
        }
        else {
            this.userService.save(this.user).subscribe(
                res => {
                    this.panelVisible = false;
                    this.user = new User();
                    this.ngOnInit();
                }
            );
        }
    }
    logout() {
        this.userService.getCurrentUser().then(
          currentUser => {
                  this.userService.deleteToken();
                  this.userService.loginStatus = false;
                  this.router.navigate(['/login']);
          }
      )
        
      }

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
      }
      set selectedColumns(val: any[]) {
        // restore original order
        this._selectedColumns = this.userColumns.filter(col => val.includes(col));
      }
      exportToPDF() {
        if(this.tableId.filteredValue != undefined && this.tableId.filteredValue != null)
        this.exportService.exportPdf(this.selectedColumns, this.tableId.filteredValue, "User List.pdf");
        else {
            this.exportService.exportPdf(this.selectedColumns,this.userList, "User List.pdf");
        }
    }

    exportToExcel() {
        if(this.tableId.filteredValue != undefined && this.tableId.filteredValue != null)
        this.exportService.exportAsExcelFile(this.selectedColumns, this.tableId.filteredValue, "User List.xlsx");
        else {
            this.exportService.exportAsExcelFile(this.selectedColumns, this.userList, "User List.xlsx");
        }
    }
}
