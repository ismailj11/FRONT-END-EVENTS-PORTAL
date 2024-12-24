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

import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { APIClient } from './core/services/api-client.service'; // Adjust path based on your project structure
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ScannerComponent } from './scanner/scanner/scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { JwtInterceptor } from './services/jwt-interceptor.service';

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
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
   QRCodeModule,
   NgxScannerQrcodeModule,ZXingScannerModule,
  
   

   
   ToastrModule.forRoot()   
  ],
  providers: [
   
    JwtInterceptor,
    
   
    APIClient ,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
 
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
