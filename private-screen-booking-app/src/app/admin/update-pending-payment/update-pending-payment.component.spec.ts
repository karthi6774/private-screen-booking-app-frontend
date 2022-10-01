import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePendingPaymentComponent } from './update-pending-payment.component';

describe('UpdatePendingPaymentComponent', () => {
  let component: UpdatePendingPaymentComponent;
  let fixture: ComponentFixture<UpdatePendingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePendingPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePendingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
