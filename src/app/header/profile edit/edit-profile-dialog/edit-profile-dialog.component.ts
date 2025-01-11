import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from 'src/app/core/services/api-client.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss'],
})
export class EditProfileDialogComponent {
  username: string;
  firstName: string;
  lastName: string;
  dob: Date | null;

  
  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDto
  ) {
    // Ensure the fields are assigned default values if null or undefined
    this.username = data.username ?? '';
    this.firstName = data.firstName ?? '';
    this.lastName = data.lastName ?? '';
    this.dob = data.dob ?? null;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Send back the updated data to the parent component
    this.dialogRef.close({
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
    });
  }
}