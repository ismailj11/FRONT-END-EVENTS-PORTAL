import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import Router
import { UserDto } from 'src/app/core/services/api-client.service';
import { APIClient } from 'src/app/core/services/api-client.service';
import { LoginRequestDto } from 'src/app/core/services/api-client.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  UserDTO: UserDto = new UserDto();
  LoginDTO: LoginRequestDto = new LoginRequestDto(); 
  username: string | null = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private apiClient: APIClient, private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user?.username || 'Guest';
  }

  Register() {
    // Reset error and success states before each submission attempt
    this.errorMessage = '';
    this.successMessage = '';
    this.passwordMismatch = false;

    // Check if all required fields are filled
    if (
      !this.UserDTO.username ||
      !this.UserDTO.email ||
      !this.UserDTO.password ||
      !this.confirmPassword ||
      !this.UserDTO.firstName ||
      !this.UserDTO.lastName ||
      !this.UserDTO.dob
    ) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Check if passwords match
    if (this.UserDTO.password !== this.confirmPassword) {
      this.passwordMismatch = true; // Set mismatch flag
      return; 
    }

    // Clear passwordMismatch flag in case of a successful match
    this.passwordMismatch = false;

    // Proceed with user registration
    this.isLoading = true; // Disable the button temporarily
    this.UserDTO.userId = 0;
    this.UserDTO.isVerified = false;
    this.UserDTO.createdAt = new Date();

    this.apiClient.add7(this.UserDTO).subscribe({
      next: () => {
          this.successMessage = 'User created successfully!';
          this.errorMessage = '';
          console.log('User created:', this.UserDTO);
  
          // Step 2: Generate OTP for Email Verification
          const email = this.UserDTO.email || ''; // Use empty string if email is null or undefined
          if (email) {
              this.apiClient.generateEmailOtp(email).subscribe({
                  next: () => {
                      console.log('OTP generated and sent to email:', email);
                      this.isLoading = false;
  
                      // Step 3: Navigate to Verify Email Component
                      this.router.navigate(['/verify-email'], { queryParams: { email } });
                  },
                  error: (error) => {
                      console.error('Error generating OTP:', error);
                      this.errorMessage = 'Failed to send OTP. Please try again.';
                      this.isLoading = false;
                  },
              });
          } else {
              console.error('Email is invalid or missing:', email);
              this.errorMessage = 'Invalid email address.';
              this.isLoading = false;
          }
      },
      error: (error) => {
          console.error('Error creating user:', error);
          this.errorMessage = 'Failed to create user.';
          this.successMessage = '';
          this.isLoading = false;
      },
  });
}}
