// Crea una base de datos
import { openDB, deleteDB, wrap, unwrap } from 'idb';
import plates from '../json/plates.json';

export async function init() {
  const db = await openDB('restaurant', 1, {
    upgrade(db, oldVersion, newVersion, transaction, event) {
      // Create a store of objects
      const store = db.createObjectStore('plates', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
      // Create an index on the 'title' property of the objects.
      store.createIndex('title', 'title', { unique: true, multiEntry: true });
      store.createIndex('price', 'price', { unique: false });
      store.createIndex('image', 'image', { unique: false });
    },
    blocked(currentVersion, blockedVersion, event) {
      // …
    },
    blocking(currentVersion, blockedVersion, event) {
      // …
    },
    terminated() {
      // …
    },
  });

  const value = await db.get('plates', 1);
  if (value) {
    console.log('Ya hay datos en la base de datos');
    return;
  }

  // Add multiple articles in one transaction:
  {
    const tx = db.transaction('plates', 'readwrite');

    const storePlates = plates.map((plate) => {
      return tx.store.add({
        title: plate.name,
        price: plate.price,
        image: plate.image,
      });
    });

    await Promise.all(storePlates);
  }
}

export async function getData(
  method = 'all',
  table = 'plates',
  index = 'title',
  query = ''
) {
  const db = await openDB('restaurant', 1);

  switch (method) {
    case 'all':
      return await db.getAllFromIndex(table, index);
    case 'get':
      return await db.getFromIndex(table, index, query);
    case 'index':
      return await db.getAllFromIndex(table, index, query);
  }
}
