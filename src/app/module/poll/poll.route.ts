import express from 'express';
import { PollController } from './poll.controller';

const router = express.Router();

router.post('/create-Poll', PollController.createPoll);
router.get('/', PollController.getAllPoll);
router.get('/:id', PollController.getSinglePoll);
router.patch('/:pollId/options/:optionId/vote', PollController.updatePoll);
router.delete('/:id', PollController.deletePoll);

export const PollRoutes = router;
