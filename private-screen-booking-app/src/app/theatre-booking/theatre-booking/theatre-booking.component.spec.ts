import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreBookingComponent } from './theatre-booking.component';

describe('TheatreBookingComponent', () => {
  let component: TheatreBookingComponent;
  let fixture: ComponentFixture<TheatreBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheatreBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheatreBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
