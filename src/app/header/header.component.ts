import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DatastoreService } from '../services/datastore.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  username: string = '';
  notificationsCount: number = 0;
  notifications: string[] = [];
  
  constructor(

    private authService: AuthService,
    private router: Router,
    private datastoreService: DatastoreService
  ) {}

  ngOnInit(): void {

    const token = localStorage.getItem("token");

   

    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (token){
        const decodedToken: any = jwtDecode(token);
       
        this.username = decodedToken.Username
      
      }

    });

    this.datastoreService.notificationsSubject.subscribe((notifications: string[]) => {
      this.notifications = notifications;
      this.notificationsCount = notifications.length;
    });
  }
  onMenuClosed(): void {
    console.log('Menu closed!');
  }
  
  changepass() {
    this.notifications = [];
    this.notificationsCount = 0;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  login() {
    this.router.navigate(['/auth']);
  }

  home() {
    this.router.navigate(['/home']);
  }

  editProfile() {
    console.log('Edit Profile clicked');
    // Add your API logic for editing profile here
  }
}
