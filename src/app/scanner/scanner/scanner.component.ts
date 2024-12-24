import { Component, OnInit } from '@angular/core';
import { APIClient } from 'src/app/core/services/api-client.service';
import { MarkAttendanceDto } from 'src/app/core/services/api-client.service';
import { BrowserQRCodeReader } from '@zxing/browser';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  qrCodeContent: any = null; // To store the full QR code content
  invitationId: string | null = null;
  errorMessage: string | null = null;

  private qrCodeReader = new BrowserQRCodeReader();

  constructor(private apiClient: APIClient) {}

  ngOnInit(): void {
    this.startScanner();
  }

  private startScanner(): void {
    console.log('Starting QR code scanner...');
    this.qrCodeReader
      .decodeOnceFromVideoDevice(undefined, 'videoElement')
      .then(result => {
        const qrCodeText = result.getText();
        if (qrCodeText) {
          console.log('Scanned QR Code Content:', qrCodeText);
          try {
          
            const qrCodeData = JSON.parse(qrCodeText);
            this.qrCodeContent = qrCodeData;

            
            this.invitationId = qrCodeData.InvitationID;

            if (this.invitationId) {
              this.markAttendance(this.invitationId);
            } else {
              this.errorMessage = 'Invalid QR Code: InvitationID not found.';
            }
          } catch (error) {
            console.error('Failed to parse QR code content:', error);
            this.errorMessage = 'Invalid QR Code content.';
          }
        } else {
          this.errorMessage = 'No text detected in the QR Code.';
        }
      })
      .catch(err => {
        console.error('Scanning error:', err);
        this.errorMessage = 'Failed to scan QR Code. Please try again.';
      });
  }

  private markAttendance(invitationId: string): void {
    const dto: MarkAttendanceDto = {
      invitationId: invitationId,
      attendanceStatus: true,
      attendedAt: new Date()
    } as MarkAttendanceDto;

    this.apiClient.mark(dto).subscribe({
      next: response => {
        console.log('Attendance marked successfully:', response);
        alert('Attendance marked successfully!');
      },
      error: error => {
        console.error('Failed to mark attendance:', error);
        alert('Failed to mark attendance. Please try again.');
      }
    });
  }
}
