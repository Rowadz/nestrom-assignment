import { Schema, Document, Types } from 'mongoose';
import { Mong } from 'src/generic/generic.interface';
import { Actor, ActorsSchema } from 'src/actors/actors.schema';
import { ObjectID } from 'mongodb';
export const MoviesSchema = new Schema(
  {
    title: String,
    duration: Number,
    gross: Number,
    genres: Array,
    num_voted_users: Number,
    cast_total_facebook_likes: Number,
    plot_keywords: Array,
    imdb_link: String,
    num_user_for_reviews: Number,
    language: String,
    country: String,
    content_rating: String,
    budget: Number,
    title_year: String,
    imdb_score: String,
    aspect_ratio: String,
    movie_facebook_likes: Number,
    actors: [ObjectID],
    director: ObjectID,
    color: String,
  },
  { _id: true },
);

export interface Movie extends Mong {
  title: string;
  duration: number;
  gross: number;
  genres: Array<string>;
  num_voted_users: number;
  cast_total_facebook_likes: number;
  plot_keywords: Array<string>;
  imdb_link: string;
  num_user_for_reviews: number;
  language: string;
  country: string;
  content_rating: string;
  budget: number;
  title_year: string;
  imdb_score: string;
  aspect_ratio: string;
  movie_facebook_likes: number;
  actors: Array<ObjectID>;
  director: ObjectID;
  color: string;
}
