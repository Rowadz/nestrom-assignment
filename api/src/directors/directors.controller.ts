import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { Director } from './directors.schema';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}
  @Get()
  all() {
    return this.directorsService.findAll();
  }

  @Post()
  create(@Body() actor: Partial<Director>) {
    return this.directorsService.create(actor);
  }

  @Put(':id')
  put(
    @Param('id') id: string,
    @Body() movie: Partial<Director>,
  ): Promise<Director> {
    return this.directorsService.put(id, movie);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Director> {
    return this.directorsService.delete(id);
  }
}
