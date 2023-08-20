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
  user.id = user._id;
  delete user._id;
  return user;
};

app.get('/users', async (request: Request, response: Response) => {
  const container = await app.get('container');
  const repository = await container.getRepository();
  const users = (await repository.findAll()).map(normalizePk);

  response.set('X-Total-Count', users.length);
  response.json(users);
});

app.get('/users/:id', async (request: Request, response: Response) => {
  const container = await app.get('container');
  const repository = await container.getRepository();

  try {
    const user = await repository.findById(request.params.id);

    if (user === null) {
      response.status(404).json({
        status: 404,
        error: 'User not found'
      });
    } else {
      response.json(normalizePk(user));
    }
  } catch (e) {
    console.log(e);
  }

});

app.post('/users', async (request: Request, response: Response) => {
  const container = await app.get('container');
  const repository = await container.getRepository();

  try {
    const user = await repository.create(request.body);
    response.status(201).json(normalizePk(user));
  } catch (e) {
    response.status(500).json({ error: e.message });
  }

});

app.put('/users/:id', async (request: Request, response: Response) => {
  const container = await app.get('container');
  const repository = await container.getRepository();

  try {
    const user = await repository.findById(request.params.id);

    if (user === null) {
      response.status(404).json({
        status: 404,
        error: 'User not found'
      });
      return
    }
    
    const newUser = {...user, ...request.body};
    await repository.update(newUser);
    response.json(normalizePk(newUser));
  } catch (e) {
    response.status(500).json({ error: e.message });
  }

});

app.delete('/users/:id', async (request: Request, response: Response) => {
  const container = await app.get('container');
  const repository = await container.getRepository();

  try {
    const user = await repository.findById(request.params.id);

    if (user === null) {
      response.status(404).json({
        status: 404,
        error: 'User not found'
      });
      return
    }
    
    await repository.deleteOne(user);
    response.sendStatus(204);
  } catch (e) {
    console.log('error-->', e)
    response.status(500).json({ error: e.message });
  }

});

app.delete('/users', async (request: Request, response: Response) => {
  const container = await app.get('container');
  const repository = await container.getRepository();

  try {   
    await repository.deleteAll();
    response.status(204).json({ success: "All users deleted with success" });
  } catch (e) {
    console.log('error-->', e);
    response.status(500).json({ error: e.message });
  }
});


export default app;
