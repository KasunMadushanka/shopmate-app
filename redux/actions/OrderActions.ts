import { ADD_MENU_ITEM } from '../types';

export const addMenuItem = menuItem => (
	{
	  type: 'ADD_MENU_ITEM',
	  payload: menuItem,
	}
  );