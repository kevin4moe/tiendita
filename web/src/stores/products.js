import { map, computed, actionFor } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export const shoppingCart = persistentAtom('locale', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const cartStore = map({
  items: [...shoppingCart.get()],
  total: computed((get) => {
    const items = get(cartStore.items);
    return items.reduce((total, item) => total + item.totalPrice, 0);
  }),
});

export const addToCart = actionFor(
  cartStore,
  'AddToCart',
  (store, newTitle) => {
    const itemList = store.get();
    store.setKey('items', [...itemList.items, newTitle]);
    shoppingCart.set([...shoppingCart.get(), newTitle]);
  }
);

export const removeFromCart = actionFor(
  cartStore,
  'RemoveFromCart',
  (store, id) => {
    const itemList = store.get();
    store.setKey(
      'items',
      itemList.items.filter((item) => item.id !== id)
    );
  }
);

export const clearCart = () => {
  cartStore.set((state) => ({
    ...state,
    items: [],
  }));
};

export const editItemFromCart = actionFor(
  cartStore,
  'EditItemFromCart',
  (store, id, newItem) => {
    const itemList = store.get();
    store.setKey(
      'items',
      itemList.items.map((item) => {
        if (item.id === id) {
          return newItem;
        }
        return item;
      })
    );
  }
);
