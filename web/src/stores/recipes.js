import { map, actionFor } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import { addItem, removeItem, editItem } from './methods.js';

export const localRecipes = persistentAtom('recipes', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const storeRecipes = map({
  items: [...localRecipes.get()],
});

export const addToCart = actionFor(storeRecipes, 'AddToCart', addItem);

export const removeFromCart = actionFor(
  storeRecipes,
  'RemoveFromCart',
  removeItem
);

export const editItemFromCart = actionFor(
  storeRecipes,
  'EditItemFromCart',
  editItem
);
