import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteEventDialogComponent } from './invite-event-dialog.component';

describe('InviteEventDialogComponent', () => {
  let component: InviteEventDialogComponent;
  let fixture: ComponentFixture<InviteEventDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteEventDialogComponent]
    });
    fixture = TestBed.createComponent(InviteEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
