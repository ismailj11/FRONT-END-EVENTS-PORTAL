import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { APIClient, CreateInvitationDtoIEnumerableApiResponse, ResendInvitationDto } from 'src/app/core/services/api-client.service';
import { ResendInviteDialogComponentComponent } from '../resend-invite-dialog-component/resend-invite-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invitation-details',
  templateUrl: './invitation-details.component.html',
  styleUrls: ['./invitation-details.component.css'],
})
export class InvitationDetailsComponent implements OnInit {
  columnsToDisplay = ['name', 'email', 'invitedAt', 'attendanceStatus', 'isEmailSent', 'allowInvitation', 'actions'];

  userid: number = 0;
  dataSource = new MatTableDataSource<CreateInvitationDtoIEnumerableApiResponse>([]);
  private eventId: number = 0; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiClient: APIClient, private dialog: MatDialog,  private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    
    if (token){
      const decodedToken: any = jwtDecode(token);
      this.userid = decodedToken.UserId;
    }

    this.route.queryParams.subscribe((params) => {
      this.eventId = Number(params['eventId']);
      if (!isNaN(this.eventId) && this.eventId > 0) {
        this.fetchInvitations(this.eventId);
      } else {
        console.error('Invalid eventId in query parameters:', params['eventId']);
      }
    });
  }

  /**
   * Fetch invitations from the API.
   */
  fetchInvitations(eventId: number): void {
    console.log('Fetching invitations for eventId:', eventId);
    this.apiClient.getInvitationByUserEventId(this.userid, eventId).subscribe({
      next: (response) => {
        console.log('Fetched Invitations:', response.data);
        this.dataSource.data = response.data ?? []; // Assign API data
        this.initializeTableFeatures(); // Initialize paginator and sorting
      },
      error: (err) => {
        console.error('Error fetching invitations:', err);
      },
    });
  }

  blockInvitation(invitationId: number): void {
    this.apiClient.blockInvitation(invitationId).subscribe({
      next: () => {
        alert('Invitation blocked successfully.');
        this.fetchInvitations(this.eventId); // Refresh the table
      },
      error: (err) => {
        console.error('Error blocking invitation:', err);
        alert('Failed to block the invitation.');
      },
    });
  }

  /**
   * Handle filter changes.
   */
  onEmailSentFilterChange(filter: string): void {
    if (filter === 'default') {
      // Fetch invitations with the current eventId and userid
      this.fetchInvitations(this.eventId);
    } else if (filter === 'sent') {
      this.fetchInvitationsByEmailSent(true);
    } else if (filter === 'notSent') {
      this.fetchInvitationsByEmailSent(false);
    }
  }

  /**
   * Fetch invitations by Email Sent filter.
   */
  fetchInvitationsByEmailSent(emailSent: boolean): void {
    // Pass the userid and eventId to the API client method
    this.apiClient.getInvitationByEmailSent(emailSent, this.eventId, this.userid).subscribe({
      next: (response) => {
        console.log('Filtered Invitations:', response.data);
        this.dataSource.data = response.data ?? []; // Assign filtered data
        this.initializeTableFeatures();
      },
      error: (err) => {
        console.error('Error fetching invitations by email sent:', err);
      }
    });
  }

  onAttendanceFilterChange(filter: string): void {
    if (filter === 'default') {
      this.fetchInvitations(this.eventId);
    } else if (filter === 'true') {
      this.fetchInvitationsByAttendance(true);
    } else if (filter === 'false') {
      this.fetchInvitationsByAttendance(false);
    }
  }




  fetchInvitationsByAttendance(attended: boolean): void {
    this.apiClient.getInvitationByAttendance(attended, this.eventId, this.userid).subscribe({
      next: (response) => {
        console.log('Filtered Invitations by Attendance:', response.data);
        this.dataSource.data = response.data ?? []; // Assign filtered data
        this.initializeTableFeatures();
      },
      error: (err) => {
        console.error('Error fetching invitations by attendance:', err);
      }
    });
  }


  openEmailDialog(invitationId: number): void {
    const dialogRef = this.dialog.open(ResendInviteDialogComponentComponent, {
      width: '300px',
      data: { email: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.email) {
        const dto = new ResendInvitationDto();
        dto.invitationId = invitationId;
        dto.email = result.email;

        this.resendInvitation(dto);
      }
    });
  }

  resendInvitation(dto: ResendInvitationDto): void {
    this.apiClient.resend(dto).subscribe({
      next: () => {
        alert('Invitation resent successfully.');
        this.fetchInvitations(this.eventId);
      },
      error: (err) => {
        console.error('Error resending invitation:', err);
        alert('Failed to resend the invitation.');
      },
    });
  }

  /**
   * Initialize paginator and sorting for the table.
   */
  private initializeTableFeatures(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
