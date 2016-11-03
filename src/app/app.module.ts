import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { ShopComponent } from './shop/shop.component';
import { ProductListComponent } from './shop/product-list/product-list.component';
import {productListReducer} from './state/product-list.reducer';
import {basketReducer} from './state/basket.reducer'
import { StoreModule } from '@ngrx/store';
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

// type StoreType = {
//   state: InternalStateType,
//   restoreInputValues: () => void,
//   disposeOldHosts: () => void
// };



@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ShopComponent,
    ProductListComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreModule.provideStore({ products: productListReducer, basket: basketReducer })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}

  hmrOnInit(store: any) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    // this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    // delete store.state;
    // delete store.restoreInputValues;
  }

  hmrOnDestroy(store: any) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    // const state = this.appState._state;
    // store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: any) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
