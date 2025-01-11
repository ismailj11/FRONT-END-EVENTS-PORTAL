import { Component, TemplateRef, ViewChild} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.css']
})
export class ViewCardsComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>; // Reference to the inline dialog template
  dialogRef!: MatDialogRef<any>;
  constructor (private router: Router, private dialog: MatDialog){
    
  }


  CreateEvent(){
  console.log('clicked')
  this.router.navigate(['create']);

 
 
}
openDialog() {
  this.dialogRef = this.dialog.open(this.dialogTemplate, {
    width: '400px', // Set dialog width
    panelClass: 'custom-dialog' // Optional: custom dialog styling
  });
}

 navigateToScanner(){
    this.router.navigate(['scanner']);
  }
  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  




  }}
