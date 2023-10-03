import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';
import { Role } from 'src/core/enum';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop({ required: true, unique: true })
  @IsString()
  @Matches(/^\+?[0-9]*$/, { message: 'Invalid mobile number.' })
  mobile?: string;

  @Prop({ default: Role.User })
  @IsString()
  role: Role;

  @Prop({ required: true, default: false })
  emailVerified?: boolean;

  @Prop({ required: true, default: false })
  mobileVerified?: boolean;

  @Prop({ required: true, default: false })
  deleted?: boolean;

  @Prop({ default: Date.now })
  @IsDateString()
  createdAt: Date;

  @Prop({ default: Date.now })
  @IsDateString()
  updatedAt: Date;

  @Prop()
  @IsDateString()
  @IsOptional()
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
