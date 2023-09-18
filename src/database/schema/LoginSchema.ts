import { Schema, model, SchemaTypes } from 'mongoose';

export const loginschema = new Schema({
  uid: {
    type: SchemaTypes.String,
  },
  rid: {
    type: SchemaTypes.String,
  },
  rname: {
    type: SchemaTypes.String,
  },
  start_ts: {
    type: SchemaTypes.Number,
    required: true,
  },
  end_ts: {
    type: SchemaTypes.Number,
    required: true,
  }
},{timestamps: true});