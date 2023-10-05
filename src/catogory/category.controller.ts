import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from './category.schema';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

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

  @Get(':id')
  getCategoryById(@Param('id') id: string): Promise<Category[]> {
    return this.categoryService.getCategoryById(id);
  }

  @Delete(':id')
  deleteCategoryById(@Param('id') id: string): Promise<Category[]> {
    return this.categoryService.deleteCategoryById(id);
  }

  @Post('/swap-index/:id1/:id2')
  swapIndex(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.categoryService.swapCategoryIndex(id1, id2);
  }
}
