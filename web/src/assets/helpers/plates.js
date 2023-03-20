import Plate from './plate';

class Plates {
  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const plate = this._list[key];
      list.push(plate);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  loadPlatesFromArray(plates = []) {
    plates.forEach((plate, index) => {
      this._list[index] = new Plate(plate);
    });
  }

  createPlate(desc = {}) {
    const plate = new Plate(desc);
    this._list[plate.id] = plate;
  }

  deletePlate(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  listByCategory() {
    const newList = {};
    this.listArr.forEach((plate) => {
      const { category } = plate;
      if (!newList[category]) {
        newList[category] = [];
      }
      newList[category].push(plate);
    });

    return newList;
  }
}

export default Plates;
