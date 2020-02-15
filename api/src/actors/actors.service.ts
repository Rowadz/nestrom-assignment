import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Actor } from './actors.schema';
import { ObjectID } from 'mongodb';
import { Movie } from 'src/movies/movies.schema';

@Injectable()
export class ActorsService {
  constructor(
    @InjectModel('Actors') private readonly actrosModel: Model<Actor>,
  ) {}

  async findAll(): Promise<Partial<Array<Actor>>> {
    return this.actrosModel.find({}).exec();
  }

  async create(movie: Partial<Actor>): Promise<Partial<Actor>> {
    return this.actrosModel.create(movie);
  }

  async put(id: string, movie: Partial<Actor>): Promise<Actor> {
    return this.actrosModel.updateOne(
      { _id: new ObjectID(id) },
      { $set: movie },
    );
  }

  async delete(id: string): Promise<Actor> {
    const a: Actor = await this.actrosModel.findById({ _id: new ObjectID(id) });
    this.actrosModel.deleteOne({ _id: new ObjectID(id) });
    return a;
  }
}
