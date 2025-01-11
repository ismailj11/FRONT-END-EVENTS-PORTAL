import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIClient } from 'src/app/core/services/api-client.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';
  otp: string = ''; // User input for OTP
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  otpErrorMessage: string = '';
  isVerified: boolean = false; 
  constructor(
    private apiClient: APIClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the email from the query parameters passed by the Signup page
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  // Submit the OTP for validation
  validateOtp() {
    this.errorMessage = '';
    this.successMessage = '';
    this.otpErrorMessage = '';
    if (!this.otp) {
      this.otpErrorMessage = 'Please enter the OTP.'; 
      return;
    }

    this.isLoading = true;

    this.apiClient.validateEmailOtp(this.email, this.otp).subscribe({
      next: () => {
        this.successMessage = 'Email verified successfully!';
        this.isLoading = false;
        
        this.isVerified = true; 
        
      },
      error: (error) => {
        this.errorMessage = 'Failed to verify OTP. Please try again.';
        this.isLoading = false;
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }
}
