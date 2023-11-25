import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AreaTag } from 'src/utils/enum';

class DimensionsDto {
  @ApiProperty()
  @IsNumber()
  length: number;

  @ApiProperty()
  @IsNumber()
  width: number;

  @ApiProperty()
  @IsNumber()
  height: number;
}

class OverviewDto {
  @IsOptional()
  @ApiProperty({ type: [String] })
  @IsString()
  finish?: string[];

  @IsOptional()
  @ApiProperty({ type: [String] })
  @IsString()
  color?: string[];

  @IsOptional()
  @ApiProperty({ type: [String] })
  @IsString()
  primaryMaterial?: string[];

  @ApiProperty()
  @IsOptional()
  @Type(() => DimensionsDto)
  dimensions?: DimensionsDto;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  seatingCapacity?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  warranty?: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  deliveryEstimate?: string;
}

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Product name is required.' })
  @IsString({ message: 'Invalid product name.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Product price is required.' })
  @IsNumber({}, { message: 'Invalid product price.' })
  price: number;

  @ApiProperty({ type: Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  isInstallationCharge?: boolean; // fix typo here

  @ApiProperty({ type: Number, default: 0 })
  @IsOptional()
  @IsNumber()
  installationCharge: number; // fix typo here

  @ApiProperty()
  @IsNotEmpty({ message: 'Product quantity is required.' })
  @IsNumber({}, { message: 'Invalid product quantity.' })
  quantity: number;

  @Type(() => OverviewDto) // Ensure this decorator is present
  @ApiProperty()
  overview: OverviewDto;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: 'Each tag must be a string.' })
  @IsEnum(AreaTag, { each: true, message: 'Invalid tag value.' })
  tags?: string[];

  @ApiProperty({ type: [String] }) // specify array type
  @IsOptional()
  images: string[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Category is required.' })
  @IsString({ message: 'Invalid category name.' })
  category: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Logo is required.' })
  @IsString({ message: 'Invalid logo link.' })
  logo: string;
}
