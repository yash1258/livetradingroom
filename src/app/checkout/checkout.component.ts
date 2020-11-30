import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaymentService } from '../services/payment.service';
import { WindowRefService } from '../services/window-ref.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private paymentService: PaymentService,
    private winRef: WindowRefService
  ) {}

  ngOnInit(): void {}

  createRazorpayOrder(): void {
    const order = {
      amount: 14999 * 100,
      currency: 'INR',
    };
    this.paymentService.createOrder(order).subscribe(
      (res) => {
        console.log(res);
        this.payWithRazor(res, order);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  payWithRazor(res, order): void {
    const options: any = {
      key: environment.razorpay_key,
      amount: 1500000,
      currency: 'INR',
      name: 'live Trading Room',
      order_id: res.id,
      modal: {
        escape: false,
      },
    };
    options.handler = (response, error) => {
      options.response = response;
      const params = new HttpParams({ fromObject: response });
      this.paymentService.verifyOrder(params).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    options.modal.ondismiss = () => {
      console.log('Transaction cancelled.');
    };
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
