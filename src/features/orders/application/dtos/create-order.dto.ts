import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { NewOrderitem } from '../../domain/value-objects';

export class CreateOrderDto {
  @Type(() => NewOrderitem)
  @IsArray()
  @ValidateNested({ each: true })
  products: NewOrderitem[];
}
