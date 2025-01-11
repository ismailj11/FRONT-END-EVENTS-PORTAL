import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { APIClient, CreateInvitationDto } from 'src/app/core/services/api-client.service';

@Component({
  selector: 'app-invite-event-dialog',
  templateUrl: './invite-event-dialog.component.html',
})
export class InviteEventDialogComponent {
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<InviteEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateInvitationDto,
    private apiClient: APIClient,
    private toastr: ToastrService
  ) {}

  send(): void {
    this.isLoading = true;

    // Automatically set attendanceStatus to false
    this.data.attendanceStatus = false;

    this.apiClient.send2(this.data).subscribe(
      () => {
        this.isLoading = false;
        this.toastr.success('Invitation sent successfully');
        this.dialogRef.close(this.data); // Close dialog and return data
      },
      (error) => {
        this.isLoading = false;
        const errorMessage = error?.message || 'An error occurred while sending the invitation.';
        this.toastr.error(errorMessage);
        console.error(error);
      }
    );
  }
}
