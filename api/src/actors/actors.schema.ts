import { Schema, Document, Types } from 'mongoose';
import { Mong } from '../generic/generic.interface';
export const ActorsSchema = new Schema({
  name: String,
  facebook_likes: Number,
  age: Number,
  facebook_page_link: String,
});

export interface Actor extends Mong {
  name: string;
  facebook_likes: number;
  age: number;
  facebook_page_link: string;
}
