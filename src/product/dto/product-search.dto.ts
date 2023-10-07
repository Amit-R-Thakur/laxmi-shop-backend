import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ProductSearchDto {
  @ApiProperty({ required: false })
  @IsOptional()
  query?: string;
}

export class RecentProductDto {
  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  size?: number = 1;
}
