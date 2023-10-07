import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  async createCategory(data: CreateCategoryDto): Promise<Category> {
    // checking if category name is exist or not
    if (
      (await this.categoryModel.count({
        name: data.name.toLocaleUpperCase(),
      })) > 0
    ) {
      throw new BadRequestException('Category already exist with this name.');
    }
    // updating index number of category
    let index = null;
    const temp = await this.categoryModel
      .findOne()
      .sort({ index: 'desc' }) // Sort by index field in descending order
      .limit(1);
    index = temp.index + 1;
    return await this.categoryModel.create({ ...data, index });
  }
  async getAllCategory(): Promise<Category[]> {
    return this.createCategories(await this.categoryModel.find());
  }
  async getCategoryById(id: string): Promise<Category[]> {
    if ((await this.categoryModel.count({ _id: id })) == 0) {
      throw new NotFoundException('Category does not exist.');
    }
    return await this.categoryModel
      .findById(id)
      .populate({ path: 'parent', model: 'Category' });
  }
  async deleteCategoryById(id: string): Promise<Category[]> {
    if ((await this.categoryModel.count({ _id: id })) == 0) {
      throw new NotFoundException('Category does not exist.');
    }
    if ((await this.categoryModel.count({ parent: id })) > 0) {
      throw new NotFoundException('Category is not empty.');
    }
    return await this.categoryModel.findByIdAndDelete(id);
  }

  async updateCategory(
    id: string,
    data: CreateCategoryDto,
  ): Promise<Category[]> {
    if ((await this.categoryModel.count({ _id: id })) == 0) {
      throw new NotFoundException('Category does not exist.');
    }
    await this.categoryModel.findByIdAndUpdate(id, data);
    return this.createCategories(await this.categoryModel.find());
  }

  async swapCategoryIndex(id1: string, id2: string): Promise<Category[]> {
    const firstCat = await this.categoryModel.findById(id1);
    const secondCat = await this.categoryModel.findById(id2);
    if (firstCat.index == null || secondCat.index == null) {
      throw new BadRequestException(`Can't swap with child category.`);
    }
    await this.categoryModel.findByIdAndUpdate(firstCat._id, {
      index: secondCat.index,
    });
    await this.categoryModel.findByIdAndUpdate(secondCat._id, {
      index: firstCat.index,
    });
    return this.createCategories(await this.categoryModel.find());
  }

  async getRandomCategories(size: number): Promise<Category[]> {
    return this.categoryModel.aggregate([
      { $match: { parent: { $ne: null } } },
      { $sample: { size } }, // Get random 10 categories
    ]);
  }

  createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter(
        (cat) =>
          cat.parent == null ||
          cat.parent == 'string' ||
          cat.parent == undefined,
      );
    } else {
      category = categories.filter((cat) => cat.parent == parentId);
    }
    for (const cat of category) {
      categoryList.push({
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
        parent: cat.parent,
        index: cat.index,
        children: this.createCategories(categories, cat._id),
      });
    }
    categoryList.sort((a, b) => a.index - b.index);
    return categoryList;
  }
}
