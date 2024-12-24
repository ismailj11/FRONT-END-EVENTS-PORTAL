import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
      
    ): boolean | Observable<boolean> | Promise<boolean> {
        if (this.authService.user.value) {
            // If the user is authenticated, allow navigation
            return true;
        } else {
            // If not authenticated, redirect to login
            this.router.navigate(['/auth']);
            return false;
    
            



            
            
                         

      
                        
                                            
                                   
                                    
                         

              

        }
    }
}
