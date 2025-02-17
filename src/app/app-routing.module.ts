import { RouterModule, Routes } from "@angular/router";
import { CreatePartyComponent } from "./main/create-party/create-party.component";
import { Component, NgModule } from "@angular/core";
import { PartyDetailsComponent } from "./main/party-details/party-details.component";
import { HomepageComponent } from "./main/homepage/homepage.component";
import { AuthGuard } from "./auth/auth.guard";
import { AuthComponent } from "./auth/auth.component";
import { UserEventsComponent } from "./main/user-events/user-events.component";
import { ScannerComponent } from "./scanner/scanner/scanner.component";
import { SignUpComponent } from "./Sign-up/signup/signup.component";

import { InvitationDetailsComponent } from "./Invitatiodetails/invitation-details/invitation-details.component";
import { EventSelectionComponent } from "./scanner/event-selection/eventselection/eventselection.component";
import { VerifyEmailComponent } from "./Sign-up/verify-email/verify-email/verify-email.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    {
path: 'invitation',
component:InvitationDetailsComponent
    },
    {
        path: 'home',
        component: HomepageComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        component: AuthComponent,
    },
    {
        path: 'create',
        component: CreatePartyComponent,
       canActivate: [AuthGuard]
    },
    {
        path: 'event',
        component: PartyDetailsComponent,
    canActivate: [AuthGuard]
    },
    {
        path: 'event/:id/edit',
        component: CreatePartyComponent,
         canActivate: [AuthGuard]
    },
    {
        path: 'event/:id/delete',
        component: CreatePartyComponent,
        canActivate: [AuthGuard]
    },

    
    { path: 'user-events', component: UserEventsComponent 
        ,canActivate: [AuthGuard]
    },
    {
path: 'scanner',component:ScannerComponent
, canActivate: [AuthGuard]
    },
    {
    path: 'signup',component: SignUpComponent
    },
    {
  path: 'selecteventtoscan',component:EventSelectionComponent
  ,canActivate: [AuthGuard]
    },
    { path: 'verify-email', component: VerifyEmailComponent },

]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }