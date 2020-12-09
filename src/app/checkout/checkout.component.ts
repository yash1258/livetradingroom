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
  tickets = 1;
  price = 74.95;
  serverResponse: string;
  constructor(
    private paymentService: PaymentService,
    private winRef: WindowRefService
  ) {}

  ngOnInit(): void {}

  updatePrice(): void {
    console.log(this.price);
    console.log(this.tickets);
    this.price = Math.floor(this.tickets * 74.95);
  }

  createRazorpayOrder(): void {
    const order = {
      amount: this.price * 100,
      currency: 'INR',
    };
    this.paymentService.createOrder(order).subscribe(
      (res) => {
        console.log(res);
        this.payWithRazor(res, order);
      },
      (err) => {
        console.log(err);
        this.serverResponse = err.error;
        setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    );
  }

  payWithRazor(res, order): void {
    console.log(res);
    const options: any = {
      key: environment.razorpay_key,
      amount: res.amount,
      currency: 'INR',
      name: 'live Trading Room',
      order_id: res.id,
      modal: {
        escape: false,
      },
    };
    options.handler = (response, error) => {
      options.response = response;
      response.subscription = this.tickets;
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
