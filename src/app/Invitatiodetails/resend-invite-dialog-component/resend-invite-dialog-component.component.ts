import { Component , Inject,} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-resend-invite-dialog-component',
  templateUrl: './resend-invite-dialog-component.component.html',
  styleUrls: ['./resend-invite-dialog-component.component.css']
})
export class ResendInviteDialogComponentComponent {
constructor( public dialogRef: MatDialogRef<ResendInviteDialogComponentComponent>,@Inject(MAT_DIALOG_DATA) public data: { email: string }){}


onCancel(): void {
  this.dialogRef.close();
}

onSubmit(): void {
  if (this.data.email) {
    this.dialogRef.close({ email: this.data.email });
  } else {
    alert('Please enter a valid email address.');
  }
}
}
