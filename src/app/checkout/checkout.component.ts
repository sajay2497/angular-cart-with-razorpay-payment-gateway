import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  allcartitem: any;
  total: number = 0;

  constructor(private cartservice: CartService, private http: HttpClient, private router: Router) { }
  options = {
    "key": "rzp_test_zXkzTrohP6YPtO", // Enter the Key ID generated from the Dashboard
    "amount": "00000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "For text",
    "description": "Test Transaction demo",
    "image": "https://logo.clearbit.com/spotify.com",
    // "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "handler": function (res: any) {
      // alert(res.razorpay_payment_id);
      // alert(res.razorpay_order_id);
      // alert(res.razorpay_signature)
      // console.log('handler',res.razorpay_payment_id);
      // this.checksuccessfulpayment(res)
      var event = new CustomEvent("payment.success",
        {
          detail: res,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
    "prefill": {
      "name": "Ajay Kumar",
      "email": "ajay.kumar@example.com",
      "contact": "9999999999"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  ngOnInit(): void {
    this.cartservice.getcartItem().subscribe(
      (res: any) => {
        this.allcartitem = res
        let totalprice = 0
        if (res) {
          for (let i = 0; i < res.length; i++) {
            const price = res[i].quantity * res[i].product.price;
            totalprice += price
          }
        }

        this.total = totalprice
        // console.log('total Price:', this.total);

      }
    )
    this.cartservice.setcartItem();
  }

  cartplus(proid: any) {
    var id = proid;
    this.cartservice.addQty(id);
  }

  cartmins(proid: any) {
    var id = proid;
    this.cartservice.removeQty(id);
  }
  singlecartdelete(proid: any) {
    var id = proid;
    this.cartservice.deleteItem(id);
  }

  payment() {
    let finalamount = parseInt((this.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    let totalpayamount = (finalamount * 100).toString();
   
    this.options.amount = totalpayamount
    // let rzp1 = new this.paymentservice.nativeWindow.Razorpay(this.options); // use service se
    let rzp1 = new Razorpay(this.options);
    rzp1.on('payment.failed', function (res: any) {
      console.log(res);
      //   alert(res.error.code);
      //   alert(res.error.description);
      //   alert(res.error.source);
      //   alert(res.error.step);
      //   alert(res.error.reason);
      //   alert(res.error.metadata.order_id);
      //   alert(res.error.metadata.payment_id);
    });
    rzp1.open();

    // let local = localStorage.getItem('cart');
    // if (local) {
    //   let localstorage = JSON.parse(local);
    //   for (let i = 0; i < localstorage.length; i++) {
    //     const id = localstorage[i].product.id;
    //     console.log(id);        
    //   }
    // } 
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    localStorage.removeItem("cart");

    console.log('onPaymentSuccess', event);
    this.cartservice.setcartItem();
    this.router.navigate(['/']);
    this.cartservice.setcartItem();
    // this.orderService.updateOrder(event.detail).subscribe(
    // data => {
    //     this.paymentId = data.message;
    // }
    // ,
    // err => {
    //     this.error = err.error.message;
    // }
    // );
  }

}
