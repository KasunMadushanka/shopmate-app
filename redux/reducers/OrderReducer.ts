import { combineReducers } from "redux";
import { ADD_MENU_ITEM } from '../types';

const INITIAL_STATE = {
    menuItems: [],
};

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_MENU_ITEM":
           
            const { menuItems } = state;
           
            const addedMenuItem = action.payload;
           
            const found = menuItems.find(item => item.menuItemId === addedMenuItem.menuItemId);
            
            if (found) {
                console.log("found")
                found.quantity = addedMenuItem.quantity;
            } else {
                console.log("new one")
                menuItems.push(addedMenuItem);
            }

            

            console.log(menuItems.length)

            // And put friend in friends.current
            

            // Finally, update the redux state
            const newState = { menuItems };

            return newState;
        default:
            return state;
    }
};

export default combineReducers({
    order: orderReducer,
});
