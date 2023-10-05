import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends Document {
  @Prop({ required: true, unique: true, uppercase: true })
  @IsString()
  name: string;

  @Prop({ type: String, unique: true, slug: 'name', slug_padding_size: 4 }) // Define the slug property based on the 'name' field
  slug: string;

  @Prop({ default: null, ref: 'Category' })
  @IsOptional()
  parent?: Types.ObjectId;

  @Prop({ default: null })
  logo?: string;

  @Prop({ default: null })
  index?: number;

  @Prop({ default: Date.now })
  @IsDateString()
  createdAt: Date;

  @Prop({ default: Date.now })
  @IsDateString()
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('save', async function (next) {
  if (this.parent.toString() === 'string') {
    this.parent = null;
  }
  next();
});
