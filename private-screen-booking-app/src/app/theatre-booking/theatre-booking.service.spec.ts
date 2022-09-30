import { TestBed } from '@angular/core/testing';

import { TheatreBookingService } from './theatre-booking.service';

describe('TheatreBookingService', () => {
  let service: TheatreBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheatreBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
