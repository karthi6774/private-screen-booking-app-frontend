import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPendingPaymentComponent } from './get-pending-payment.component';

describe('GetPendingPaymentComponent', () => {
  let component: GetPendingPaymentComponent;
  let fixture: ComponentFixture<GetPendingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPendingPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPendingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
