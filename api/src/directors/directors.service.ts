import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Director } from './directors.schema';
import { ObjectID } from 'mongodb';
import { Movie } from 'src/movies/movies.schema';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectModel('Director') private readonly directorsModel: Model<Director>,
    @InjectModel('Movies') private readonly moviesModel: Model<Movie>,
  ) {}

  async findAll(): Promise<Partial<Array<Director>>> {
    return this.directorsModel.find({}).exec();
  }

  async create(movie: Partial<Director>): Promise<Partial<Director>> {
    return this.directorsModel.create(movie);
  }

  async put(id: string, movie: Partial<Director>): Promise<Director> {
    return this.directorsModel.updateOne(
      { _id: new ObjectID(id) },
      { $set: movie },
    );
  }

  async delete(id: string): Promise<Director> {
    const a: Director = await this.directorsModel.findById({
      _id: new ObjectID(id),
    });
    this.delMovieRef(id)
      .then(() => {
        this.directorsModel
          .deleteOne({ _id: new ObjectID(id) })
          .catch(console.error);
      })
      .catch(console.error);
    return a;
  }

  private async delMovieRef(actorId: string): Promise<void> {
    const id = new ObjectID(actorId);
    this.moviesModel
      .updateMany({ director: id }, { $set: { director: null } })
      .exec()
      .catch(console.error);
  }
}
