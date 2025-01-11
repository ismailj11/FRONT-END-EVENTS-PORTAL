import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIClient, EventDto } from 'src/app/core/services/api-client.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-eventselection',
  templateUrl: './eventselection.component.html',
  styleUrls: ['./eventselection.component.css']
})


export class EventSelectionComponent implements OnInit {
  events: EventDto[] = [];
  userId: number | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private apiClient: APIClient, private router: Router) {}

  ngOnInit(): void {
    this.getUserIdFromToken();
    this.fetchEvents();
  }

  private getUserIdFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.UserId;
    } else {
      this.errorMessage = 'User is not authenticated.';
    }
  }

  private fetchEvents(): void {
    if (this.userId) {
      this.isLoading = true;
      this.apiClient.getEventByUserId(this.userId).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success && response.data) {
            this.events = response.data.map((event: any) => new EventDto(event));
          } else {
            this.errorMessage = 'No events found.';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load events.';
          console.error(err);
        }
      });
    }
  }

  selectEvent(eventId: number | undefined): void {
    if (!eventId) {
      console.error('Event ID is undefined');
      this.errorMessage = 'Cannot select this event because the ID is missing.';
      return;
    }

    console.log('Navigating to scanner with Event ID:', eventId); // Debugging log
    this.router.navigate(['/scanner', eventId]); // Navigate to scanner with eventId
  }
}