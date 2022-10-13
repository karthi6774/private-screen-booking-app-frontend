import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazorPaymentComponent } from './razor-payment.component';

describe('RazorPaymentComponent', () => {
  let component: RazorPaymentComponent;
  let fixture: ComponentFixture<RazorPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RazorPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RazorPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
