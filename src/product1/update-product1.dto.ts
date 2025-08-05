import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product1.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
