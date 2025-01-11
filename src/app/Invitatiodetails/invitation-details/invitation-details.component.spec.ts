import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationDetailsComponent } from './invitation-details.component';

describe('InvitationDetailsComponent', () => {
  let component: InvitationDetailsComponent;
  let fixture: ComponentFixture<InvitationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitationDetailsComponent]
    });
    fixture = TestBed.createComponent(InvitationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
