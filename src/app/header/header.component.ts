import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DatastoreService } from '../services/datastore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  notificationsCount: number = 0;
  notifications: string[] = [];

  constructor(private authService: AuthService, private router: Router, private datastoreService: DatastoreService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    // NOT WORKING                       
    this.datastoreService.notificationsSubject.subscribe((notifications: string[]) => {
      this.notifications = notifications;
      this.notificationsCount = notifications.length;
    });
  }

  clearNotifications() {
    this.notifications = [];
    this.notificationsCount = 0;
  }

  logOut() {
    this.authService.logout();
  }

  login() {
    this.router.navigate(['auth']);
  }

  home() {
    this.router.navigate(['home']);
  }
}
