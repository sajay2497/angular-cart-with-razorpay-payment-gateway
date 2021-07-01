import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private cartItem = new Subject<any>();

  setcartItem() {
    let local = localStorage.getItem('cart');
    if (local) {
      this.cartItem.next(JSON.parse(local));
    }else{
      this.cartItem.next()
    }
  }

  getcartItem(): Observable<any> {
    return this.cartItem.asObservable();
  }



  addtocart(item: any) {
    let local_storage;

    let items = {
      product: item,
      quantity: 1,
    }
    let itemsInCart: { product: any; quantity: number; }[] = [];
    if (localStorage.getItem('cart') == null) {
      local_storage = [];
      itemsInCart.push(items);
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      this.setcartItem();
    }
    else {
      let local = localStorage.getItem('cart');
      if (local) {
        local_storage = JSON.parse(local)
      } else {
        local_storage = []
      }
      for (var i in local_storage) {
        if (items.product.id == local_storage[i].product.id) {
          local_storage[i].quantity += 1;
          items = null as any;
          break;
        }
      }
      if (items) {
        itemsInCart.push(items);
      }
      local_storage.forEach(function (item: { product: any; quantity: number; }) {
        itemsInCart.push(item);
      })
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      this.setcartItem();
    }
  }

  addQty(id: any) {
    // console.log(item);/
    let item = {
      id: id
    }
    let shopping_cart;
    let local = localStorage.getItem('cart');
    if (local) {
      shopping_cart = JSON.parse(local)
    } else {
      shopping_cart = []
    }
    for (let i in shopping_cart) {
      if (item.id == shopping_cart[i].product.id) {
        shopping_cart[i].quantity += 1;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
    this.setcartItem();
  }

  removeQty(id: any) {
    let item = {
      id: id
    }
    let shopping_cart;
    let local = localStorage.getItem('cart');
    if (local) {
      shopping_cart = JSON.parse(local)
    } else {
      shopping_cart = []
    }
    for (let i in shopping_cart) {
      if (item.id == shopping_cart[i].product.id) {
        shopping_cart[i].quantity -= 1;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
    this.setcartItem();
  }

  deleteItem(id: any) {
    let item = {
      id: id
    }
    // console.log("Deleting : ", item);
    let shopping_cart;
    let index;
    let local = localStorage.getItem('cart');
    if (local) {
      shopping_cart = JSON.parse(local)
    } else {
      shopping_cart = []
    }
    for (let i in shopping_cart) {
      if (item.id == shopping_cart[i].product.id) {
        index = i;
        console.log(index);
      }
    }
    shopping_cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
    this.setcartItem();
  }
}
