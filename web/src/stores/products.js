import { map, computed, actionFor } from 'nanostores';

export const cartStore = map({
  items: [],
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
  }
);

export const removeFromCart = (item) => {
  cartStore.set((state) => ({
    ...state,
    items: state.items.filter((i) => i.id !== item.id),
  }));
};

export const clearCart = () => {
  cartStore.set((state) => ({
    ...state,
    items: [],
  }));
};
