import { Injectable } from '@angular/core';
import { APIClient, LoginRequestDto } from '../core/services/api-client.service'; // Adjust import for LoginRequestDto
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<any>(null);
    private tokenExpirationTimer: any;

    constructor(private apiClient: APIClient, private router: Router) {}

    login(creds: { username: string; password: string }) {
        const loginRequest = LoginRequestDto.fromJS({
            username: creds.username,
            password: creds.password
          
        });

        // Call APIClient's login method
        return this.apiClient.login(loginRequest);
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (userData && userData.token) {
            this.user.next(userData);
        }
    }

    private handleAuthentication(token: string) {
        this.user.next({ token });
        localStorage.setItem('userData', JSON.stringify({ token }));
    }
}
