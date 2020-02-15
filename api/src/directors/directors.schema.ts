import { Schema } from 'mongoose';
import { Mong } from '../generic/generic.interface';

export const DirectorsSchema = new Schema(
  {
    name: String,
    facebook_likes: Number,
    age: Number,
    username: String,
    password: String,
  },
  { _id: true },
);

export interface Director extends Mong {
  name: string;
  facebook_likes: number;
  age: number;
  username: string;
  password: string;
}
