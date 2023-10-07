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
  @ApiProperty()
  @IsString()
  finish?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  color?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  primaryMaterial?: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions?: DimensionsDto;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  armrest?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  cushionedSeating?: boolean;

  @IsOptional()
  @ApiProperty()
  @IsString()
  cushionType?: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  seatingCapacity?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  productQuantity?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  warranty?: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  brand?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  deliveryEstimate?: string;
}

class HtmlDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  overviewHtml: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  merchantDetailsHtml: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  careInstructionsHtml: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  deliveryInstallationHtml: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  warrantyHtml: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  disclaimerHtml: string;
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

  @ApiProperty()
  @IsNotEmpty({ message: 'Product quantity is required.' })
  @IsNumber({}, { message: 'Invalid product quantity.' })
  quantity: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => OverviewDto)
  overview: OverviewDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => HtmlDto)
  html: HtmlDto;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: 'Each tag must be a string.' })
  @IsEnum(AreaTag, { each: true, message: 'Invalid tag value.' })
  tags?: string[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Category is required.' })
  @IsString({ message: 'Invalid category name.' })
  category: string;
}
