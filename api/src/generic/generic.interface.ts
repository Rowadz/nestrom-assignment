import { Document } from 'mongoose';

export interface Mong extends Document {
  _id: string;
  __v: number;
}
