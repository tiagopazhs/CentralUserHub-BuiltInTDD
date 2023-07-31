import express, { Request, Response } from 'express'; // Make sure to import Request and Response types

const app = express();

app.get('/users', async (request: Request, response: Response) => {
  response.json({ message: 'hello world' }); // Wrap the string in an object
});

export default app;
