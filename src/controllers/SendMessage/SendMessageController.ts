import { Request, Response } from 'express';
import { SendMessageUseCase } from '../../useCases/SendMessageUseCase';
import { StatusCodes } from 'http-status-codes';
import { Message } from '../../models/IMessage';

class SendMessageController {
  constructor(private sendMessage: SendMessageUseCase) {}

  async handle(request: Request, response: Response) {
    const { message, email } = request.body;

    const messageAssistant = await this.sendMessage.execute({
      content: message,
      sender: email
    } as Message);

    return response.status(StatusCodes.OK).json({
      response: messageAssistant.content,
      sender: messageAssistant.sender
    });
  }
}

export { SendMessageController };
