
import {assign, find, map} from 'lodash';
import {ActionReducer, Action} from "@ngrx/store";
import {BUY, UNBUY} from './shop.state'


let initialState = [
  {id: 1, name: 'buty'},
  {id: 2, name: 'chleb'},
  {id: 3, name: 'kaszanka'}
]


export const productListReducer: ActionReducer<any[]> = (state:any[] = initialState, action: Action) => {
    switch (action.type) {
        case BUY:
            return setBuyFlag(action.payload, true, state);
        case UNBUY:
            return setBuyFlag(action.payload, false, state);
        default:
            return state;
    }
}


function setBuyFlag(prodId, buy, state){
  return  map(state, (p:any)=>{
    if (p.id !== prodId) {
      return p;
    }
    return assign({}, p, {sold: buy});
  });
}
