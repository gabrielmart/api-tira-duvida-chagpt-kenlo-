import { MongoDBUsersRepository } from '../../repositories/UserRepository/mongodb/MongoDBUsersRepository';
import { SendMessageController } from './SendMessageController';
import { SendMessageUseCase } from '../../useCases/SendMessageUseCase';
import { OpenAIChatService } from '../../services/ChatService/openAI/OpenAIChatService';

export const sendMessageFactory = () => {
  const usersRepository = new MongoDBUsersRepository();
  const chatService = new OpenAIChatService();
  const createUserUseCase = new SendMessageUseCase(
    usersRepository,
    chatService
  );
  const createUserController = new SendMessageController(createUserUseCase);
  return createUserController;
};
