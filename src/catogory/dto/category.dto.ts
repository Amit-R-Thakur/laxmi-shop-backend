import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty({ message: ' Category name is required.' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: ' Slug is required.' })
  @IsString()
  slug: string;

  @ApiProperty()
  @IsOptional()
  parent?: string;

  @ApiProperty()
  @IsOptional()
  logo?: string;
}

export class RandomCategoryDto {
  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  size?: number = 10;
}
