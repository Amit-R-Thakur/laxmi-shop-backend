import { ApiProperty } from '@nestjs/swagger';
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
