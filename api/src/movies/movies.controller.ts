import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movies.schema';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  all(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Post()
  create(@Body() movie: Partial<Movie>): Promise<Movie> {
    console.log(movie);
    return this.moviesService.create(movie);
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() movie: Partial<Movie>): Promise<Movie> {
    return this.moviesService.put(id, movie);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.delete(id);
  }
}
