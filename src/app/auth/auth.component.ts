import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  errorMessage: string = "";
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private toastr : ToastrService) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required) // Only require the field to be filled
    });
  }



  signIn() {
    if (this.authForm.valid) {
      this.isLoading = true;
      const authData = this.authForm.getRawValue();

      this.authService.login(authData).subscribe(
        (response: any) => {
          this.isLoading = false;
          console.log(response);
          

          const token = response.data;
          this.authService['handleAuthentication'](token);
         
          this.toastr.success('Successfull');
        
          localStorage.setItem("token",token);


           

          // Redirect after successful login
          this.router.navigate(['/']).then(success => {
            console.log("Navigation success:", success);
                       

          }).catch(err => {
            console.error("Navigation error:", err);
      
          });


        }
        
        
        
        ,
        (error) => {
          this.isLoading = false;

          // error
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message; // backend error
          } else if (error.message) {
            this.errorMessage = error.message; // Fallback error message
          } else {
            this.errorMessage = "An unexpected error occurred.";
          }

          console.error("Error during login:", error);
          
        }


        
      );
    }
  }
}
