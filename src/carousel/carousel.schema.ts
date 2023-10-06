import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, IsOptional } from 'class-validator';

export type CarouselDocument = Carousel & Document;

@Schema({ timestamps: true })
export class Carousel extends Document {
  @Prop({ required: true })
  @IsString()
  tittle: string;

  @Prop({ required: true })
  @IsOptional()
  description?: string;

  @Prop({ required: true })
  @IsString()
  image: string;
}

export const CarouselSchema = SchemaFactory.createForClass(Carousel);
