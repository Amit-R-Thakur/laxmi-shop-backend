import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { AreaTag } from '../utils/enum';

export class Dimensions {
  @Prop({ default: 0 })
  length?: number;

  @Prop({ default: 0 })
  width?: number;

  @Prop({ default: 0 })
  height?: number;
}

export class Overview {
  @Prop()
  finish?: string;

  @Prop()
  color?: string;

  @Prop()
  primaryMaterial?: string;

  @Prop()
  dimensions?: Dimensions;

  @Prop()
  armrest?: boolean;

  @Prop()
  cushionedSeating?: boolean;

  @Prop()
  cushionType?: string;

  @Prop()
  seatingCapacity?: number;

  @Prop()
  productQuantity?: number;

  @Prop()
  warranty?: number;

  @Prop()
  brand?: string;
  @Prop()
  deliveryEstimate?: string;
}

export class Html {
  @Prop()
  overviewHtml: string;

  @Prop()
  merchantDetailsHtml: string;

  @Prop()
  careInstructionsHtml: string;

  @Prop()
  deliveryInstallationHtml: string;

  @Prop()
  warrantyHtml: string;

  @Prop()
  disclaimerHtml: string;
}

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  @IsNotEmpty({ message: 'Product name is required' })
  @IsString({ message: 'Invalid product name' })
  name: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'Product price is required' })
  @IsNumber({}, { message: 'Invalid product price' })
  price: number;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'Product quantity is required' })
  @IsNumber({}, { message: 'Invalid product quantity' })
  quantity: number;

  @Prop()
  overview: Overview;

  @Prop()
  html: Html;

  @Prop({
    type: [{ type: String, enum: Object.values(AreaTag) }],
  })
  tags: AreaTag[];

  @Prop({ ref: 'Category' })
  category: mongoose.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
