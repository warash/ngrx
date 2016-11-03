import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {ShopState} from '../../state/shop.state'
import { Store } from '@ngrx/store';
@Component({
  selector: 'product-list',
  styleUrls: [ './product-list.component.css' ],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  products:Observable<any>;
  constructor(private store: Store<ShopState> ) {
    this.products = store.select('products');
  }
  buy(p){
    this.store.dispatch({type: 'BUY', payload: p.id})
  }
  unbuy(p){
    this.store.dispatch({type: 'UNBUY', payload: p.id})
  }
}
