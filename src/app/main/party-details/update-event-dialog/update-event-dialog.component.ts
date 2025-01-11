import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIClient, EventDto } from 'src/app/core/services/api-client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-event-dialog',
  templateUrl: './update-event-dialog.component.html',
})
export class UpdateEventDialogComponent implements OnInit {
  updateForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventDto,
    private apiClient: APIClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Initialize the form with values from the injected data
    this.updateForm = this.fb.group({
      eventName: [this.data.eventName, Validators.required],
      description: [this.data.description, Validators.required],
      eventType: [this.data.eventType, Validators.required],
      date: [this.data.date || '', Validators.required],
      maxAttendees: [this.data.maxAttendees, [Validators.required, Validators.min(1)]],
      location: [this.data.location, Validators.required],
      category: [this.data.category, Validators.required],
      requiresTicket: [this.data.requiresTicket],
    });
  }

  // Save event updates
  onUpdateEventDetails(): void {
    if (this.updateForm.valid) {
      this.isLoading = true;

      const formValue = this.updateForm.value;

      const updatedEvent: EventDto = {
        ...this.data,
        ...formValue,
      };

      // Send the updated event data to the API
      this.apiClient.update(updatedEvent).subscribe(
        (response) => {
          this.isLoading = false;
          if (response && response.success) {
            this.toastr.success('Event updated successfully!');
            this.dialogRef.close(updatedEvent); // Close dialog with updated data
          } else {
            this.toastr.error(response.errorMessage || 'Failed to update the event.');
          }
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error(error.error?.message || 'An unexpected error occurred.');
        }
      );
    }
  }

  // Handle close button click
  onCloseClick(): void {
    // Confirm before closing
    const shouldClose = confirm('Do you want to close?');
    if (shouldClose) {
      this.dialogRef.close(); // Close the dialog if confirmed
    }
  }


  confirmAndClose(): void {
    const shouldClose = confirm('Do you want to close?');
    if (shouldClose) {
      this.dialogRef.close(); // Close the dialog
    }
  }

  // Intercept closing when clicking outside or pressing ESC
  interceptClose(): void {
    this.confirmAndClose();
  }
}
