import { Component, OnInit } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/browser';
import {jwtDecode} from 'jwt-decode';
import { APIClient, MarkAttendanceDto } from 'src/app/core/services/api-client.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  userId: number | null = null;
  qrCodeContent: any = null;
  invitationId: string | null = null;
  errorMessage: string | null = null;

  private qrCodeReader = new BrowserQRCodeReader();

  constructor(private apiClient: APIClient) {}

  ngOnInit(): void {
    this.getUserIdFromToken();
    this.startScanner();
  }

  private getUserIdFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userId = decodedToken.UserId;
        console.log('User ID retrieved from token:', this.userId);
      } catch (error) {
        console.error('Error decoding token:', error);
        this.errorMessage = 'Invalid or expired token.';
      }
    } else {
      this.errorMessage = 'No token found. Please log in.';
    }
  }

  startScanner(): void {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.errorMessage = 'Camera access is not supported on this device.';
      return;
    }

    console.log('Starting QR code scanner...');
    this.qrCodeReader
      .decodeOnceFromVideoDevice(undefined, 'videoElement')
      .then((result) => {
        const qrCodeText = result.getText();
        console.log('QR Code scanned:', qrCodeText);

        if (qrCodeText) {
          const qrCodeData = JSON.parse(qrCodeText);
          this.qrCodeContent = qrCodeData;
          this.invitationId = qrCodeData.InvitationID;

          if (this.invitationId) {
            this.markAttendance(this.invitationId);
          } else {
            this.errorMessage = 'Invalid QR Code: InvitationID not found.';
          }
        }
      })
      .catch((err) => {
        console.error('Error scanning QR Code:', err);
        this.errorMessage = 'Failed to scan QR Code. Ensure the camera is accessible.';
      });
  }

  private markAttendance(invitationId: string): void {
    if (!this.userId) {
      this.errorMessage = 'User information is missing.';
      return;
    }

    const dto: MarkAttendanceDto = {
      invitationId: invitationId,
      fkUserId: this.userId,
      attendanceStatus: true,
      attendedAt: new Date(),
      isScanned: true
    } as MarkAttendanceDto; 

    this.apiClient.mark(dto).subscribe({
      next: (response) => {
        console.log('Attendance marked successfully:', response);
        alert('Attendance marked successfully!');
      },
      error: (error) => {
        console.error('Failed to mark attendance:', error);
        alert('Failed to mark attendance.');
      }
    });
  }
}
