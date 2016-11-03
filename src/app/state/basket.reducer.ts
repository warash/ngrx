
import {assign, find, map} from 'lodash';
import {ActionReducer, Action} from "@ngrx/store";
import {BUY, UNBUY} from './shop.state'



export const basketReducer: ActionReducer<any[]> = (state:any[] = [], action: Action) => {
    switch (action.type) {
        case BUY:
          return [
              ...state,
              action.payload
          ];
        case UNBUY:
            return state.filter(p => p.id !== action.payload);
        default:
            return state;
    }
}
