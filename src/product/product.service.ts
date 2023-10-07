import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Category } from 'src/catogory/category.schema';
import { AreaTag } from 'src/utils/enum';
import { ProductDto } from './dto/create-product.dto';
import { ProductSearchDto } from './dto/product-search.dto';
import { Product } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createProductDto: ProductDto): Promise<Product> {
    if (
      !isValidObjectId(createProductDto.category) ||
      (await this.categoryModel.count({ _id: createProductDto.category })) == 0
    ) {
      throw new BadRequestException('Invalid category or does not exist.');
    }
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  getProductTags(): string[] {
    return Object.values(AreaTag).filter((key) => typeof key === 'string');
  }

  async getProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async getProductByCategory(categoryId: string): Promise<Product[]> {
    const childCategories = await this.categoryModel.find({
      parent: categoryId,
    });

    const categories: string[] = [
      categoryId,
      ...childCategories.map((d) => d._id.toString()),
    ];

    return await this.productModel.find({ category: { $in: categories } });
  }

  async deleteProductById(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }

  async getProductByAreaTag(): Promise<any> {
    const result: any = {};
    const keys = Object.keys(AreaTag);

    const productPromises = keys.map(async (key) => {
      const products = await this.productModel.find({ tags: key });
      result[key] = products;
    });

    await Promise.all(productPromises);

    return result;
  }

  async searchProducts(searchDto: ProductSearchDto): Promise<Product[]> {
    const query: any = {
      $or: [
        { name: { $regex: new RegExp(searchDto.query, 'i') } },
        { tags: { $regex: new RegExp(searchDto.query, 'i') } },
      ],
    };

    return await this.productModel.find(query).exec();
  }

  async getRecentProduct(limit: number): Promise<Product[]> {
    return await this.productModel.find().sort({ createdAt: -1 }).limit(limit);
  }
}
