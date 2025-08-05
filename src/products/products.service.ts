import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './create-product.dto';

interface FilterDto {
  name?: string;
  startDate?: string;
  endDate?: string;
  stockMin?: string;
  stockMax?: string;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(dto: CreateProductDto, imageFilenames: string[]) {
    const newProduct = new this.productModel({
      ...dto,
      images: imageFilenames,
    });
    return await newProduct.save();
  }

  async filterProducts(filterDto: FilterDto) {
    const { name, startDate, endDate, stockMin, stockMax } = filterDto;

    const filter: any = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    if (stockMin || stockMax) {
      filter.stock = {};
      if (stockMin) filter.stock.$gte = Number(stockMin);
      if (stockMax) filter.stock.$lte = Number(stockMax);
    }

    return this.productModel.find(filter).exec();
  }
}
