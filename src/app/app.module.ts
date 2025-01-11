import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreatePartyComponent } from './main/create-party/create-party.component';
import { PartyDetailsComponent } from './main/party-details/party-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './main/homepage/homepage.component';
import { AuthComponent } from './auth/auth.component';
import { ViewCardsComponent } from './main/homepage/view-cards/view-cards.component';
import { ContactComponent } from './main/homepage/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { UserEventsComponent } from './main/user-events/user-events.component';
import {MatIconModule} from '@angular/material/icon';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { APIClient } from './core/services/api-client.service'; // Adjust path based on your project structure
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ScannerComponent } from './scanner/scanner/scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { JwtInterceptor } from './services/jwt-interceptor.service';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SignUpComponent } from './Sign-up/signup/signup.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import { InvitationDetailsComponent } from './Invitatiodetails/invitation-details/invitation-details.component';
import { MatTableModule } from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { ResendInviteDialogComponentComponent } from './Invitatiodetails/resend-invite-dialog-component/resend-invite-dialog-component.component';
import { UpdateEventDialogComponent } from './main/party-details/update-event-dialog/update-event-dialog.component';
import { InviteEventDialogComponent } from './main/party-details/invite-event-dialog/invite-event-dialog.component';
import { EventSelectionComponent } from './scanner/event-selection/eventselection/eventselection.component';
import { VerifyEmailComponent } from './Sign-up/verify-email/verify-email/verify-email.component';
import {MatDividerModule} from '@angular/material/divider';
import { EditProfileDialogComponent } from './header/profile edit/edit-profile-dialog/edit-profile-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SidebarComponent,
    CreatePartyComponent,
    PartyDetailsComponent,
    HomepageComponent,
    AuthComponent,
    ViewCardsComponent,
    ContactComponent,
    UserEventsComponent,
    ScannerComponent,
    SignUpComponent,
    InvitationDetailsComponent,
    ResendInviteDialogComponentComponent,
    UpdateEventDialogComponent,
    InviteEventDialogComponent,
    EventSelectionComponent,
    VerifyEmailComponent,
    EditProfileDialogComponent,
    EditProfileDialogComponent 
    
  ],
  imports: [
    BrowserModule,
    FormsModule,MatTableModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
   QRCodeModule,
   NgxScannerQrcodeModule,ZXingScannerModule,
   MatButtonModule,
   BrowserAnimationsModule,
   BrowserModule ,MatMenuModule,
   MatFormFieldModule,MatCardModule,MatInputModule,
   ToastrModule.forRoot()   ,MatSelectModule,MatDatepickerModule,MatCheckboxModule
,MatNativeDateModule , MatIconModule, MatPaginatorModule,MatProgressSpinnerModule,MatDialogModule,MatDividerModule
  ],
  providers: [
   
    JwtInterceptor,
    
   
    APIClient ,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
 
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
