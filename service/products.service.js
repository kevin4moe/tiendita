import { faker } from '@faker-js/faker';

class ProductsService {
  constructor(productsRepository = []) {
    this.productsRepository = productsRepository;

    this.productsRepository.length === 0 ? this.createFake() : false;
  }

  create(products = []) {
    if (products.length > 0) {
      products.forEach((product) => {
        this.productsRepository.push(product);
      });
    } else {
      this.productsRepository.push(products);
    }
  }

  createFake(size) {
    const limit = size || 100;
    const products = [];

    for (let i = 0; i < limit; i++) {
      products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
      });
    }

    this.create(products);
  }

  find(id) {
    const product = this.productsRepository.find(id);
    return product;
  }

  findOne(id) {
    const product = this.productsRepository.findOne(id);
    return product;
  }

  update(id, changes) {
    const product = this.productsRepository.update(id, changes);
    return product;
  }

  delete(id) {
    const product = this.productsRepository.delete(id);
    return product;
  }

  async getProducts() {
    const products = await this.productsRepository.getProducts();
    return products;
  }
}

export default ProductsService;
