import { Component, OnInit } from '@angular/core';
import { APIClient, CreateInvitationDto, EventDto } from 'src/app/core/services/api-client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEventDialogComponent } from './update-event-dialog/update-event-dialog.component';
import { InvitationDetailsComponent } from 'src/app/Invitatiodetails/invitation-details/invitation-details.component';
import { InviteEventDialogComponent } from './invite-event-dialog/invite-event-dialog.component';
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
  constructor(private apiClient: APIClient, private router: Router, private toastr:ToastrService,private dialog: MatDialog) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");

    if (token){
      const decodedToken: any = jwtDecode(token);
      this.organizerId = decodedToken.UserId
    }




    this.fetchEvents();
   

    


  }




  onSearch(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value;
  
    if (searchText.length >= 3) {
    
      this.isLoading = true;
      this.apiClient.searchEventByName(searchText, this.organizerId).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success && response.data) {
            this.events = response.data.map((event: any) => new EventDto(event));
          } else {
            this.events = []; 
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Error searching events.';
          console.error(err);
        }
      });
    } else {
      
      this.fetchEvents();
    }
  }
  

  




goToInvitationDetails(eventId: number | undefined): void {
  if (eventId !== undefined) {
    this.router.navigate(['/invitation'], { queryParams: { eventId } });
  } else {
    this.toastr.error('Invalid event ID. Please try again.');
  }
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
    const dialogRef = this.dialog.open(UpdateEventDialogComponent, {
      width: '600px',
      data: { ...event }, 
      disableClose: true, 
    });
  
    
    dialogRef.backdropClick().subscribe(() => {
      const shouldClose = confirm('Do you want to close?');
      if (shouldClose) {
        dialogRef.close(); 
      }
    });
  
    // Handle the result after the dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle updated event (e.g., refresh event list)
        this.fetchEvents();
      }
    });
  }
  


   
    // dialog invite
    onInviteToEvent(event: any): void {
      const dialogRef = this.dialog.open(InviteEventDialogComponent, {
        width: '400px',
        data: { fkEventId: event.eventId, fkUserId: this.organizerId  },
      });
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Handle the invitation data here

          console.log('Invitation sent:', result);
          this.fetchEvents();
        }
      });
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
