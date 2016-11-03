import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: ShopComponent },
  { path: '**',    component: ShopComponent },
];
