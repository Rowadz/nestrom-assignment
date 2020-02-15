import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Actor } from './actors.schema';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Get()
  all() {
    return this.actorsService.findAll();
  }

  @Post()
  create(@Body() actor: Partial<Actor>) {
    return this.actorsService.create(actor);
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() movie: Partial<Actor>): Promise<Actor> {
    return this.actorsService.put(id, movie);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Actor> {
    return this.actorsService.delete(id);
  }
}
