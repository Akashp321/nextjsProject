import {
  Controller,
  Post,
  Get,
  Body,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './create-product.dto';
import { ProductsService } from './products.service';
import { multerConfig } from '../config/multer.config';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('upload-single')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProductDto,
  ) {
    return this.productService.createProduct(body, [file.filename]);
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('images', 5, multerConfig))
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateProductDto,
  ) {
    const filenames = files.map((file) => file.filename);
    return this.productService.createProduct(body, filenames);
  }

  @Get('filter')
  async filterProducts(
    @Query('name') name?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('stockMin') stockMin?: string,
    @Query('stockMax') stockMax?: string,
  ) {
    return this.productService.filterProducts({
      name,
      startDate,
      endDate,
      stockMin,
      stockMax,
    });
  }
}
