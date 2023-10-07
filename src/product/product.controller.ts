import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/create-product.dto';
import { ProductSearchDto, RecentProductDto } from './dto/product-search.dto';
import { Product } from './product.schema';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get('tags')
  getProductTag(): string[] {
    return this.productService.getProductTags();
  }

  @Get('search')
  async searchProducts(
    @Query() searchDto: ProductSearchDto,
  ): Promise<Product[]> {
    return await this.productService.searchProducts(searchDto);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Get('category/:categoryId')
  async getProductByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<Product[]> {
    return this.productService.getProductByCategory(categoryId);
  }

  @Get('by/area')
  async getProductByAreaTag(): Promise<any> {
    return this.productService.getProductByAreaTag();
  }

  @Get('by/recent')
  async getRecentProduct(
    @Query() recentDto: RecentProductDto,
  ): Promise<Product[]> {
    return this.productService.getRecentProduct(recentDto.size);
  }

  @Post()
  async createProduct(
    @Body(new ValidationPipe()) createProductDto: ProductDto,
  ) {
    return this.productService.create(createProductDto);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProductById(id);
  }
}
