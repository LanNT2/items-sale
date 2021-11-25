import { combineReducers } from "redux";
import {counter} from"./cart/cart-counter";

const appReducer = combineReducers({
    counter:counter
});

export default appReducer;