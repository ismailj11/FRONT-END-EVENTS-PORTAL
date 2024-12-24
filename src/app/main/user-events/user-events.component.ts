import { Component, OnInit } from '@angular/core';
import { APIClient, EventDto } from 'src/app/core/services/api-client.service'; // Adjusted for APIClient and EventDto types
import { EventDtoIEnumerableApiResponse } from 'src/app/core/services/api-client.service'; // For response type

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit {
  events: EventDto[] = []; // Updated type based on API client
  filteredEvents: EventDto[] = [];
  searchQuery: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private apiClient: APIClient) {}

  ngOnInit(): void {
    this.fetchEvents(); // Fetch events on initialization
  }

  // Fetch events from the API
  fetchEvents(): void {
    this.isLoading = true;
    this.apiClient.getAll().subscribe({
      next: (response: EventDtoIEnumerableApiResponse) => {
        // Check if 'data' contains the array of events
        if (response && response.data) { 
          this.events = response.data; // Use 'data' to access the event array
          this.filteredEvents = [...this.events]; // Copy events to filteredEvents
        } else {
          this.errorMessage = 'No events found.';
          console.error('Response structure does not contain data.');
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load events. Please try again later.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }
  
  // Filter events based on search query
  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.filteredEvents = this.events.filter(event =>
        Object.values(event).join(' ').toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredEvents = [...this.events];
    }
  }
}
