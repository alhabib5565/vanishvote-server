import { model, Schema } from 'mongoose';
import { TOption, TPollData, TVote } from './poll.interface';

// Vote Schema
const voteSchema = new Schema<TVote>(
  {
    ip: { type: String, required: true },
    comment: { type: String },
  },
  { _id: false },
);

// Option Schema
const optionSchema = new Schema<TOption>(
  {
    text: { type: String, required: true },
    votes: { type: [voteSchema], default: [] },
  },
  {
    _id: true,
  },
);

// Poll Schema
const pollSchema = new Schema<TPollData>({
  title: { type: String, required: true },
  pollType: { type: String, required: true },
  options: {
    type: [optionSchema],
    validate: {
      validator: function (options: TOption[]) {
        return options && options.length >= 2;
      },
      message: 'A poll must have at least 2 options.',
    },
  },
  settings: {
    allowMultipleSelection: { type: { type: String, default: 'false' } },
    requireParticipantNames: { type: Boolean, default: false },
    resultsVisibility: { type: String, default: 'always_public' },
    pollExpiryDate: { type: Date },
    allowComments: { type: Boolean, default: false },
  },
});

export const Poll = model('Poll', pollSchema);
