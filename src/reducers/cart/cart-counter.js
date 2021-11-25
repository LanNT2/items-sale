import userService from "../../services/item/user.service";

const cartItemCount = parseInt(userService.getItemCountInCart());
console.log(cartItemCount);

function counter (state = cartItemCount, action){
    switch (action.type) {
      case "INCREMENT":
        return state + action.payload;
      default:
        return state;
    }
};
  
export {counter};