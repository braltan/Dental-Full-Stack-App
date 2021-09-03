import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './packages/user/service/user.service';
import { LanguageMessagesService } from './packages/util/languageMessagesService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'frontend-angular';

  constructor( 
    private translate: TranslateService,
    public userService: UserService, 
    private languageMessagesService: LanguageMessagesService,)
  {
    if (sessionStorage.getItem('locale') != null) {
      translate.setDefaultLang(sessionStorage.getItem('locale'));
  } else {
      translate.setDefaultLang('tr');
  }
  }
  async ngOnInit() {
    this.languageMessagesService.setTranslate();
  }
}
