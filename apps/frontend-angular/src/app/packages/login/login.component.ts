import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SelectItem } from 'primeng/api';
import { UserService } from '../user/service/user.service';
import { LanguageMessagesService } from '../util/languageMessagesService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private translateService: TranslateService,
    private languageMessagesService: LanguageMessagesService,
    private router: Router,
    private messageService: MessageService
  ) {}

  model = {
    username: '',
    password: ''
  };
  languages: SelectItem[];
  language: string;

  ngOnInit() {
    this.languages = [
      {label: 'English', value: 'en'}
  ];
  this.userService.isLoggedIn().then(
    res => {
      if(res){
      this.router.navigateByUrl('/patient');
      this.userService.loginStatus = true;
      }
    }
  )

    this.language = localStorage.getItem('locale');
  }
  onChangeLanguage() {
      localStorage.setItem('locale', this.language);
      this.translateService.setDefaultLang(localStorage.getItem('locale'));
  }
  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      res => {
        if (res['status'] === 404) {
          this.messageService.clear();
          this.messageService.add({severity:'error', summary: 'Wrong username or password', detail: ''});
        } else {
          this.userService.setToken(res);
          this.userService.loginStatus = true;
          this.router.navigateByUrl('/patient');
        }
      },
      err => {
        if(err.status = 401) {
          this.messageService.clear();
          this.messageService.add({severity:'error', summary:this.languageMessagesService.msgjson.wrongUserPass, detail: ''});
        }
        else {
        this.messageService.clear();
        this.messageService.add({severity:'error', summary: err.message, detail: ''});
        }
      }
    );
  }
}
