import { Router } from 'express';
import StatusCode from 'http-status-codes';
import { sendMessageFactory } from '../controllers/SendMessage/SendMessageFactory';
import validateRoutes from '../middlewares/validateRoutes';
import { SendMessageSchema } from '../schemas/SendMessageSchema';

const routes = Router();

routes.route('/').get((req, res) => {
  res.status(StatusCode.OK).send('Bem vindo a Tira Duvida ChatGPT Kenlo!');
});

routes.post(
  '/ask-gpt',
  validateRoutes(SendMessageSchema),
  (request, response) => sendMessageFactory().handle(request, response)
);

export { routes };
