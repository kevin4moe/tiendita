import { faker } from '@faker-js/faker';
import boom from '@hapi/boom';

class ProductsService {
  constructor(productsRepository = []) {
    this.productsRepository = productsRepository;

    this.productsRepository.length === 0 ? this.createFake() : false;
  }

  async create(products = []) {
    if (products.length > 0) {
      const ids = [];
      products.forEach((product) => {
        const id = faker.datatype.uuid();
        this.productsRepository.push({
          id,
          ...product,
        });
        ids.push(id);
      });
      return ids;
    } else {
      const id = faker.datatype.uuid();
      this.productsRepository.push({
        id,
        ...products,
      });
      return id;
    }
  }

  createFake(size) {
    const limit = size || 50;
    const products = [];

    for (let i = 0; i < limit; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.imageUrl(),
      });
    }

    this.create(products);
  }

  async find(id) {
    const index = this.productsRepository.findIndex(
      (product) => product.id === id
    );
    return index;
  }

  async update(id, changes) {
    const index = await this.find(id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = (this.productsRepository[index] = {
      ...this.productsRepository[index],
      ...changes,
    });
    return product;
  }

  async delete(id) {
    const index = await this.find(id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.productsRepository.splice(index, 1);
    return id;
  }

  async getProduct(id) {
    const index = await this.find(id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }

    const product = await this.productsRepository[index];
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async getProducts() {
    const products = await this.productsRepository.getProducts();
    return products;
  }
}

export default ProductsService;
