import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventselectionComponent } from './eventselection.component';

describe('EventselectionComponent', () => {
  let component: EventselectionComponent;
  let fixture: ComponentFixture<EventselectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventselectionComponent]
    });
    fixture = TestBed.createComponent(EventselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
