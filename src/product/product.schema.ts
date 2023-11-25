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
  finish?: [string];

  @Prop()
  color?: [string];

  @Prop()
  primaryMaterial?: [string];

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

  @Prop({ required: false, default: false })
  isInstalltionCharge?: boolean;

  @Prop({ required: false, default: 0 })
  @IsNumber({}, { message: 'Invalid product price' })
  installtionCharge: number;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'Product quantity is required' })
  @IsNumber({}, { message: 'Invalid product quantity' })
  quantity: number;

  @Prop({ required: true, type: String })
  @IsNotEmpty({ message: 'Logo is required' })
  @IsString({ message: 'Invalid logo link' })
  logo: string;

  @Prop({ required: true, type: [String] })
  @IsNotEmpty({ message: 'Logo is required' })
  @IsString({ message: 'Invalid logo link' })
  images: [string];

  @Prop()
  overview: Overview;

  @Prop({
    type: [{ type: String, enum: Object.values(AreaTag) }],
  })
  tags: AreaTag[];

  @Prop({ ref: 'Category', default: null })
  category?: mongoose.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('save', async function (next) {
  if (this?.category && this?.category?.toString() === 'string') {
    this.category = null;
  }
  next();
});
