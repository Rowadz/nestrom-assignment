import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActorsSchema } from './actors.schema';
import { MoviesService } from 'src/movies/movies.service';
import { MoviesSchema } from 'src/movies/movies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Actors', schema: ActorsSchema }]),
  ],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
