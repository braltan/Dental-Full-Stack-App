import { Injectable } from '@angular/core';
import { PrimeNGConfig, Translation } from 'primeng/api';
const enjson = require("../../../assets/i18n/en.json");


@Injectable({
  providedIn: 'root'
})
export class LanguageMessagesService {

  msgjson;

  constructor(
    public primengConfig: PrimeNGConfig
  ) {
    this.setMessages();
  }

  setMessages() {
    if (sessionStorage.getItem('locale') == null) {
      sessionStorage.setItem('locale', 'en');
    }
    if (sessionStorage.getItem('locale') == 'en') {
      this.msgjson = enjson.messages;
    }
  }

  setTranslate() {
    // this.setMessages();
    let translation: Translation = {...this.msgjson};
    this.primengConfig.setTranslation(translation);
  }

}
