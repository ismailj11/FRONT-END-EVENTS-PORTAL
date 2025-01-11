
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIClient, EventDto } from 'src/app/core/services/api-client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import {FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.css']
})
export class CreatePartyComponent implements OnInit {
  partyForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  organizerId: number = 0;
  username!: string; 
  Createdat!: Date;
  constructor(private apiClient: APIClient, private router: Router, private toastr : ToastrService) {


   
  }
   


  ngOnInit(): void {
  
    const token = localStorage.getItem("token");

    if (token){
      const decodedToken: any = jwtDecode(token);
      this.organizerId = decodedToken.UserId
      this.username = decodedToken.Username
    
    }

    this.Createdat =new Date()
    this.partyForm = new FormGroup({

      
      eventName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      eventType: new FormControl('Public', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      maxAttendees: new FormControl(1, [Validators.required, Validators.min(1)]),
      location: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      requiresTicket: new FormControl(false, [Validators.required]),
      fkOrganizerId: new FormControl(this.organizerId, [Validators.required]), 
      createdAt: new FormControl(this.Createdat, [Validators.required])
    
    
    
    });
  }

  onCreatePartyDetails(): void {
    if (this.partyForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
  
      const eventData: EventDto = this.partyForm.getRawValue(); // Map form data to EventDto
  
      this.apiClient.add(eventData).subscribe(
        (response) => {
          this.isLoading = false;
  
          if (response && response.success) {
            this.successMessage = 'Event created successfully!';
            this.toastr.success('Created Successfully');
            this.partyForm.reset(); 
            this.router.navigate(['/event']);
            
          } else {
            // Handle custom error messages from the backend response
            this.errorMessage = response.errorMessage || 'Failed to create the event.';
          }
        },
        (error) => {
          this.isLoading = false;
  
          // Check specific HTTP status or error structure
          if (error.status === 404) {
            this.errorMessage = 'Backend not found (404). Please contact support.';
          } else if (error.status === 400) {
            this.errorMessage = 'Invalid request. Please check the entered details.';
          } else {
            this.errorMessage = error.error?.message || 'An unexpected error occurred. Please try again.';
          }
  
          console.error('Error creating event:', error); // Log error for debugging
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}  


