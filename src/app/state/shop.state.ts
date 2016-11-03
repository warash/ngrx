import { ActionReducer, Action } from '@ngrx/store';

export const BUY = 'BUY';
export const UNBUY = 'UNBUY';



export interface ShopState{
  products:any[];
  basket:any[];
}
