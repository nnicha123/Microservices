import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();
router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),

    // Using typescript -> need to add types to req,res
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Turn errors which are objects to arrays which allows it to be passed as json
      return res.status(400).send(errors.array());
    }
    const { email, password } = req.body;
    console.log('Creating a user');
    res.send({});
  }
);
export { router as signupRouter };
