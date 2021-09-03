import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '@dental-full-stack-app/models';
import { BaseService } from '../../base/base.service';
import { ConfigService } from '../../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class PatientService extends BaseService<Patient, string>{
    noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

    constructor(private configService: ConfigService, private http: HttpClient) {
        super(http, configService.getConfig().apiBaseUrl + '/patient');
    }
}
