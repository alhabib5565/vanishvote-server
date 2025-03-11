/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { TPollData, TVote } from './poll.interface';
import { Poll } from './poll.model';

const createPoll = async (payload: TPollData) => {
  const result = await Poll.create(payload);
  return result;
};

const getAllPoll = async (query: Record<string, unknown>) => {
  const searchAbleFields = ['name', 'slug'];
  const PollQuery = new QueryBuilder(query, Poll.find())
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await PollQuery.countTotal();
  const result = await PollQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSinglePoll = async (_id: string) => {
  const result = await Poll.findOne({ _id });
  return result;
};

const updatePoll = async (
  pollId: string,
  optionId: string,
  payload: Partial<TVote>,
) => {
  const poll = await Poll.findOne({ _id: pollId });

  if (!poll) {
    throw new AppError(httpStatus.NOT_FOUND, 'Poll not found!!');
  }

  // @ts-expect-error
  const option = poll.options.find((optn) => optn._id.equals(optionId));
  if (!option) {
    throw new AppError(httpStatus.NOT_FOUND, 'Option not found!!');
  }

  option.votes.push({
    comment: payload?.comment || '',
    ip: payload?.ip || '',
  });

  const result = await Poll.findOneAndUpdate(
    { _id: pollId },
    {
      options: poll.options,
    },
    { new: true },
  );
  return result;
};

const deletePoll = async (slug: string) => {
  const book = await Poll.findOne({ slug });
  if (!book) {
    throw new AppError(httpStatus.NOT_FOUND, 'Poll not found!!');
  }

  const result = await Poll.findOneAndDelete({ slug });
  return result;
};

export const PollService = {
  createPoll,
  getAllPoll,
  getSinglePoll,
  updatePoll,
  deletePoll,
};
