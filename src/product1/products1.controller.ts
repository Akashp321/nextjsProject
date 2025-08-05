import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './create-product1.dto';
import { ProductsService } from './products1.service';
import { multerConfig } from '../config/multer.config';

@Controller('products1')
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
}
