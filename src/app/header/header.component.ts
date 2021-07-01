import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  allcartitem: any;

  constructor(private cartservice: CartService) { }

  ngOnInit(): void {
    this.cartservice.getcartItem().subscribe(
      (res: any) => {
        // console.log(res);
        this.allcartitem = res
      }
    )
    this.cartservice.setcartItem();
  }


}
