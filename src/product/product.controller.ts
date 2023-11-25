import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  Get,
  Param,
  Delete,
  Query,
  Patch,
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

  @Post()
  async createProduct(@Body() createProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() createProductDto,
  ): Promise<Product> {
    return this.productService.update(id, createProductDto);
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

  @Delete(':id')
  async deleteProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProductById(id);
  }

  @Delete('images/:id')
  async deleteImagesByUrl(
    @Param('id') id: string,
    @Query('url') url: string,
  ): Promise<Product> {
    return this.productService.deleteImagesByUrl(id, url);
  }
}
