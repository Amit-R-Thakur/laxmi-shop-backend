import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from './category.schema';
import { CategoryService } from './category.service';
import { CreateCategoryDto, RandomCategoryDto } from './dto/category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() data: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(data);
  }
  @Get()
  getCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }

  @Get('list')
  getCategoryList(): Promise<Category[]> {
    return this.categoryService.getAllCategoryList();
  }

  @Get('child/all')
  getChildCategoryList(): Promise<Category[]> {
    return this.categoryService.getChildCategoryList();
  }

  @Get('random')
  getRandomCategories(@Query() data: RandomCategoryDto): Promise<Category[]> {
    return this.categoryService.getRandomCategories(data.size);
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string): Promise<Category[]> {
    return this.categoryService.getCategoryById(id);
  }

  @Patch(':id')
  updateCategory(
    @Body() data: CreateCategoryDto,
    @Param('id') id: string,
  ): Promise<Category[]> {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  deleteCategoryById(@Param('id') id: string): Promise<Category[]> {
    return this.categoryService.deleteCategoryById(id);
  }

  @Patch('/swap-index/:id1/:id2')
  swapIndex(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.categoryService.swapCategoryIndex(id1, id2);
  }
}
