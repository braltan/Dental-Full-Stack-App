import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from '../user/service/user.service';
import { LanguageMessagesService } from '../util/languageMessagesService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  constructor(private userService: UserService, private router: Router,private languageMessagesService: LanguageMessagesService) { }

  ngOnInit() {
    this.items = [
      {label: this.languageMessagesService.msgjson.patient + ' ' + this.languageMessagesService.msgjson.list, routerLink: '/patient'},
      {label: this.languageMessagesService.msgjson.users + ' ' + this.languageMessagesService.msgjson.list, routerLink: '/user'},
  ];

  }

  onLogout(){
    this.userService.deleteToken();
    this.userService.loginStatus = false;
    this.router.navigate(['/login']);
  }

}
