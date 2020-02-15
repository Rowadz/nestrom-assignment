import { Module } from '@nestjs/common';
import { DirectorsController } from './directors.controller';
import { DirectorsService } from './directors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectorsSchema } from './directors.schema';
import { MoviesService } from 'src/movies/movies.service';
import { MoviesSchema } from 'src/movies/movies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Director', schema: DirectorsSchema },
      { name: 'Movies', schema: MoviesSchema },
    ]),
  ],
  controllers: [DirectorsController],
  providers: [DirectorsService, MoviesService],
})
export class DirectorsModule {}
