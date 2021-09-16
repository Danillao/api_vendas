import {EntityRepository, Repository} from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        id,
      }
    });
    return product;
  }


  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      }
    });

    return product;
  }

}


export default ProductRepository;
