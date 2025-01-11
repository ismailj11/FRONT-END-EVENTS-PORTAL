import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendInviteDialogComponentComponent } from './resend-invite-dialog-component.component';

describe('ResendInviteDialogComponentComponent', () => {
  let component: ResendInviteDialogComponentComponent;
  let fixture: ComponentFixture<ResendInviteDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResendInviteDialogComponentComponent]
    });
    fixture = TestBed.createComponent(ResendInviteDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
