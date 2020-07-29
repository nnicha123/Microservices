import express from 'express';
import { currentUser } from '../middlewares/current-user';
// import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();
// added middleware as the second and third argument (in order)
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});
export { router as currentUserRouter };
