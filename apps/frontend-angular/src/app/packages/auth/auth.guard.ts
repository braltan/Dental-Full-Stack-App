import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/service/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
        
        let _isLoggedIn: boolean;
    
        await this.userService.isLoggedIn()
          .then(res => _isLoggedIn = res)
          .catch(err => _isLoggedIn = false);
    
        if (_isLoggedIn) {
            this.userService.loginStatus = true;
              this.userService.getCurrentUser().then(
                res => {
               
               /*   if (this.userService.checkPagePermission(next.routeConfig.path,res.permission)) {
                    return true;
                   } else {
                    this.router.navigate(['/forbidden']);
                    return false;
                  }*/
                  return true;
    
                },
                err => {
                  console.log(err);
                }
              );
              return true;
        } else {
            this.router.navigateByUrl('/login');
            this.userService.loginStatus = false;
            this.userService.deleteToken();
            return false;
          }
          
      }
}
