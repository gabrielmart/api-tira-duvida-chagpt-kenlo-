import { UnauthorizedError } from '../../errors/UnauthorizedError';
import { Interaction } from '../../models/Interaction';
import { Message } from '../../models/IMessage';
import { MessageUser } from '../../models/MessageUser';
import { IUsersRepository } from '../../repositories/UserRepository/IUsersRepository';
import { IChatService } from '../../services/ChatService/IChatService';

class SendMessageUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private chatService: IChatService
  ) {}

  async execute({ content, sender }: Message) {
    const userAlreadyExists = await this.usersRepository.exists(sender);

    if (!userAlreadyExists)
      throw new UnauthorizedError(
        'O Usuário informado não existe, por isso não será possível enviar sua mensagem!'
      );

    const user = await this.usersRepository.find(sender);

    const messageUser = MessageUser.create(content, sender);

    const messageAssistant = await this.chatService.ask({
      content,
      sender
    } as Message);

    const interaction = Interaction.create(messageUser, messageAssistant!);

    user!.interactions = interaction;

    await this.usersRepository.update(user!);

    return interaction.messageAssistant;
  }
}

export { SendMessageUseCase };
