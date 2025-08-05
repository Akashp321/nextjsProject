import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product1.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './create-product1.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(dto: CreateProductDto, imageFilenames: string[]) {
    const newProduct = new this.productModel({
      ...dto,
      images: imageFilenames,
    });

    return await newProduct.save();
  }
}
