import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@dental-full-stack-app/models';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class UserService  {

    loginStatus = false;
    noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

    constructor(private configService: ConfigService, private http: HttpClient) {
    }

    // HttpMethods
    register(t: User): Observable<User> {
      return this.http.post<User>( this.configService.getConfig().apiBaseUrl + '/users/register', t);
  }
  save(t: User): Observable<User> {
    return this.http.post<User>( this.configService.getConfig().apiBaseUrl + '/users', t);
}

    findOne(id: string): Observable<User> {
      return this.http.get<User>(this.configService.getConfig().apiBaseUrl + '/users' + '/' + id);
  }


  findAll(): Observable<User[]> {
      return this.http.get<User[]>(this.configService.getConfig().apiBaseUrl + '/users');
  }

  delete(id: string): Observable<User> {
      return this.http.delete<User>(this.configService.getConfig().apiBaseUrl + '/users' + '/' + id);
  }

    login(authCredentials): Observable<any> {
        return this.http.post(
          this.configService.getConfig().apiBaseUrl + '/users/login',
          authCredentials
        );
      }

      changePassword(query): Observable<any> {
        return this.http.post(
          this.configService.getConfig().apiBaseUrl + '/users/changePassword',
          query
        );
      }
    getCurrentUser(): Promise<User> {
        const token = this.getToken();
        if (token) {
            return this.getUserPayload(token).then(res => {
              return res.user;
            });
        }
    }

    // Helper Methods

    setToken(token: any) {
        sessionStorage.setItem('sessionId', token.accessToken);
    }

    getToken() {
        return sessionStorage.getItem('sessionId');
    }

    deleteToken() {
        sessionStorage.removeItem('sessionId');
    }

    getUserPayload(token: string): Promise<any> {
        return this.http.post<any>(
            this.configService.getConfig().apiBaseUrl +
        '/users/userPayload/',
            {'accessToken': this.getToken()}
        ).toPromise();

    }
    isLoggedIn(): Promise<any> {
        try {
          return new Promise<any>((resolve, reject) => {
            const token = this.getToken();
            if (token) {
              this.getUserPayload(token).then(res => { 
                if (res) {  
                  const bool = res.expires_in > ((Date.now() - res.login_date) / 1000);
                  resolve(bool);
                } else {
                  resolve(false);
                }
              },
              ).catch(err => reject(err));
            } else {
              resolve(false);
            }
          });
        } catch (error) {
          console.log('error: ', error);
        }
      }

}
