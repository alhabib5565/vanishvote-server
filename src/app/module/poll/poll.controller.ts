import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { PollService } from './poll.service';

const createPoll = catchAsync(async (req: Request, res: Response) => {
  const result = await PollService.createPoll(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Poll created successfully.',
    data: result,
  });
});

const getAllPoll = catchAsync(async (req: Request, res: Response) => {
  const { result, meta } = await PollService.getAllPoll(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Polls retrieved successfully.',
    meta,
    data: result,
  });
});

const getSinglePoll = catchAsync(async (req: Request, res: Response) => {
  const result = await PollService.getSinglePoll(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Poll with Slug ${req.params.id} get successfully.`,
    data: result,
  });
});

const updatePoll = catchAsync(async (req: Request, res: Response) => {
  const pollId = req.params.pollId;
  const optionId = req.params.optionId;
  const result = await PollService.updatePoll(pollId, optionId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Vote recorded successfully`,
    data: result,
  });
});

const deletePoll = catchAsync(async (req: Request, res: Response) => {
  const result = await PollService.deletePoll(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Book with Slug ${req.params.id} delete successfully`,
    data: result,
  });
});

export const PollController = {
  createPoll,
  getAllPoll,
  getSinglePoll,
  updatePoll,
  deletePoll,
};
