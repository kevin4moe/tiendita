const addItem = (state, item = {}, localState = null) => {
  console.log('addItem', item);
  const itemList = state.get();
  state.setKey('items', [...itemList.items, item]);
  if (localState) {
    localState.set([...localState.get(), item]);
  }
};

const removeItem = (state, id, localState = null) => {
  const itemList = state.get();
  state.setKey(
    'items',
    itemList.items.filter((item) => item.id !== id)
  );
  if (localState) {
    localState.set(localState.get().filter((item) => item.id !== id));
  }
};

const clearCart = (state) => {
  state.set((store) => ({
    ...store,
    items: [],
  }));
};

const editItem = (state, id, newItem, localState = null) => {
  const itemList = state.get();
  state.setKey(
    'items',
    itemList.items.map((item) => {
      if (item.id === id) {
        return newItem;
      }
      return item;
    })
  );
  if (localState) {
    localState.set(
      localState.get().map((item) => {
        if (item.id === id) {
          return newItem;
        }
        return item;
      })
    );
  }
};

export { addItem, removeItem, clearCart, editItem };
