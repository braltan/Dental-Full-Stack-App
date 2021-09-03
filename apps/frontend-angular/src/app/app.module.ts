import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { AppComponent } from './app.component';
import { AuthGuard } from './packages/auth/auth.guard';
import { AuthInterceptor } from './packages/auth/auth.interceptor';
import { ColumnFilterDateComponent } from './packages/columnFilter-date/columnFilter-date.component';
import { ConfigService } from './packages/config/config.service';
import { LoginComponent } from './packages/login/login.component';
import { MenuComponent } from './packages/menu/menu.component';
import { PatientComponent } from './packages/patient/component/patient.component';
import { PaymentComponent } from './packages/payment/component/payment.component';
import { UserComponent } from './packages/user/component/user.component';
import { UserService } from './packages/user/service/user.service';
import { ExportService } from './packages/util/exportService.service';
import { appRoutes } from './routes';



export function configurationServiceInitializerFactory(configurationService: ConfigService): Function {
  // a lambda is required here, otherwise `this` won't work inside ConfigurationService::load
  return () => configurationService.load();
}

@NgModule({
  declarations: [AppComponent,UserComponent,LoginComponent,MenuComponent,PatientComponent,PaymentComponent,ColumnFilterDateComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes),   
    HttpClientModule,
    MessageModule,
    MessagesModule,
    DialogModule,
    PanelModule,
    MenubarModule,
    SidebarModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    PasswordModule,
    ConfirmDialogModule,
    FormsModule,
    TabViewModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    InputNumberModule,
    CalendarModule,
    InputMaskModule,
TableModule,
     TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
})
  ],
  providers: [ { 
    provide: APP_INITIALIZER,
    useFactory: configurationServiceInitializerFactory,
    deps: [ConfigService], multi: true },
{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
},
AuthGuard,
UserService,
ExportService,
ConfirmationService,
MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}