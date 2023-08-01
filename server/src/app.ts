import express, { Request, Response } from 'express';
import cors from 'cors';
import createContainer from './container';

const app = express();
app.use(express.json());
app.use(cors({
  exposedHeaders: ['x-total-count'],
}));
app.set('container', createContainer());

const normalizePk = (user) => {
  user._id = user._id;
  return user;
};

app.get('/users', async (request: Request, response: Response) => {
  response.json({ message: 'hello world' }); // Wrap the string in an object
});

export default app;
