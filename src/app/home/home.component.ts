import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productlist: any;

  constructor(private http:HttpClient, private cartservice: CartService) { }

  ngOnInit(): void {
    this.fatchproduct();
  }

  fatchproduct(){
    this.http.get('https://fakestoreapi.com/products').subscribe(
      res=>{
        this.productlist = res
      }
    )
  }
  addtocart(data:any){
    this.cartservice.addtocart(data);
  }

}
