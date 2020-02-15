import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movies.schema';
import { ObjectID } from 'mongodb';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movies') private readonly movieModel: Model<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async create(movie: Partial<Movie>): Promise<Movie> {
    return await this.movieModel.create(movie);
  }

  async put(id: string, movie: Partial<Movie>): Promise<Movie> {
    return await this.movieModel.updateOne(
      { _id: new ObjectID(id) },
      { $set: movie },
    );
  }

  async delete(id: string): Promise<Movie> {
    const m: Movie = await this.movieModel.findById({ _id: new ObjectID(id) });
    await this.movieModel.deleteOne({ _id: new ObjectID(id) });
    return m;
  }
}
