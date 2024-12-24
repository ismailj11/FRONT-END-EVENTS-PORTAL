import { Component, OnInit } from '@angular/core';
import { APIClient, CreateInvitationDto, EventDto } from 'src/app/core/services/api-client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
declare var bootstrap: any; // For Bootstrap modal handling

@Component({
  selector: 'app-party-details',
  templateUrl: './party-details.component.html',
  styleUrls: ['./party-details.component.css']
})
export class PartyDetailsComponent implements OnInit {
  events: EventDto[] = [];
  invitation: CreateInvitationDto = new CreateInvitationDto();  // Invitation DTO

  selectedEvent: EventDto = new EventDto({}); 
  isLoading: boolean = false;
  errorMessage: string = '';
  organizerId: number = 0;
  constructor(private apiClient: APIClient, private router: Router, private toastr:ToastrService) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");

    if (token){
      const decodedToken: any = jwtDecode(token);
      this.organizerId = decodedToken.UserId
    }

    this.fetchEvents();
   


  }


  

  fetchEvents(): void {
    this.isLoading = true;
    this.apiClient.getEventByUserId(this.organizerId).subscribe(
      (response) => {
        this.isLoading = false;
        if (response && response.success && response.data) {
          this.events = response.data.map((event: any) => new EventDto(event)); // Properly map data to EventDto
        } else {
          this.errorMessage = 'Failed to load event details.';
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred while fetching events.';
        console.error(error);
      }
    );
  }

  onUpdateEvent(event: EventDto): void {
    // Clone and initialize selectedEvent to avoid type issues
    this.selectedEvent = new EventDto({ ...event });

    const modalElement = document.getElementById('updateEventModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  saveUpdatedEvent(): void {
    this.isLoading = true;
    this.apiClient.update(this.selectedEvent).subscribe(
      (response) => {
        this.isLoading = false;
        if (response && response.success) {
          // Find the index of the updated event
          const index = this.events.findIndex((e) => e.eventId === this.selectedEvent.eventId);
          if (index !== -1) {
            // Replace the event with the updated one, properly cloning to a new EventDto
            this.events[index] = new EventDto({ ...this.selectedEvent });
          }
          this.toastr.success('event updated successfully');
       
        } else {
          this.errorMessage = response.errorMessage || 'Failed to update the event.';
          this.toastr.success('event update Failed');
        }

        // Close the modal
        const modalElement = document.getElementById('updateEventModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred while updating the event.';
        console.error(error);
      }
    );
  }
   
    // Handle the opening of the invite event modal
    onInviteToEvent(event: EventDto): void {
      // Prepare the invitation DTO with event-related and user-related data
      this.invitation.fkEventId = event.eventId;  // Use selected event's ID
      this.invitation.fkUserId = this.organizerId;  // Use the UserId from the token
      this.invitation.invitedAt = new Date();  // Set the current date and time
  
      // Open the modal for inviting
      const modalElement = document.getElementById('inviteEventModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }



    sendInvitation(): void {
      // Automatically set attendanceStatus to false
      this.invitation.attendanceStatus = false;
    
      this.isLoading = true;
      this.apiClient.send2(this.invitation).subscribe(
        () => {
          // Assuming the absence of an error means success
          this.isLoading = false;
          this.toastr.success('Invitation sent successfully');
          
          // Close the modal after sending the invitation
          const modalElement = document.getElementById('inviteEventModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          }
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error?.message || 'An error occurred while sending the invitation.';
          this.toastr.error(this.errorMessage);
          console.error(error);
        }
      );
    }
  

  onDeleteEvent(event: EventDto): void {
    const confirmDelete = confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      this.isLoading = true;
      this.apiClient.delete(event).subscribe(
        (response) => {
          this.isLoading = false;
          if (response && response.success) {
            this.events = this.events.filter((e) => e.eventId !== event.eventId); // Remove deleted event from the list
            alert('Event deleted successfully.');
            

          } else {
            this.errorMessage = response.errorMessage || 'Failed to delete the event.';
          }
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'An error occurred while deleting the event.';
          console.error(error);
        }
      );
    }
  }
}
