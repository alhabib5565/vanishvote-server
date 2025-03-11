import express from 'express';
import { PollRoutes } from '../module/poll/poll.route';

const router = express.Router();

const appRoutes = [
  {
    path: '/polls',
    routes: PollRoutes,
  },
];

appRoutes.map((routes) => router.use(routes.path, routes.routes));

export const routes = router;
