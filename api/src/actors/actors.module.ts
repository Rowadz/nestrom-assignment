import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActorsSchema } from './actors.schema';
import { MoviesService } from 'src/movies/movies.service';
import { MoviesSchema } from 'src/movies/movies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Actors', schema: ActorsSchema },
      { name: 'Movies', schema: MoviesSchema },
    ]),
  ],
  controllers: [ActorsController],
  providers: [ActorsService, MoviesService],
})
export class ActorsModule {}
