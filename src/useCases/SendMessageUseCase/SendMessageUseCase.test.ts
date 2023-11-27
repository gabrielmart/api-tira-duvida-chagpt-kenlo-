import { SendMessageUseCase } from '.';
import { Interaction } from '../../models/Interaction';
import { MessageAssistant } from '../../models/MessageAssistant';
import { MessageUser } from '../../models/MessageUser';
import { User } from '../../models/User';
import { IUsersRepository } from '../../repositories/UserRepository/IUsersRepository';
import { InMemoryUsersRepository } from '../../repositories/UserRepository/inMemory/InMemoryUsersRepository';
import { IChatService } from '../../services/ChatService/IChatService';
import { chatServiceMock } from '../../services/ChatService/chatServiceMock/';

describe('Send Message', () => {
  let usersRepository: IUsersRepository;
  let chatService: IChatService;
  let sendMessageUseCase: SendMessageUseCase;

  beforeEach(() => {
    const email = 'gmartins@hotmail.com';
    const messageUser = MessageUser.create('Uma duvida', email);
    const messageAssistant = MessageAssistant.create(
      'Uma duvida',
      'Nome da Assistente'
    );
    const interaction = Interaction.create(messageUser, messageAssistant);

    const user = User.create('Gabriel Martins', email, '11982511217', [
      interaction
    ]);
    usersRepository = new InMemoryUsersRepository();
    chatService = new chatServiceMock();
    usersRepository.create(user);
    sendMessageUseCase = new SendMessageUseCase(usersRepository, chatService);
  });

  it('should able to send a message to AI', async () => {
    const messageData = {
      sender: 'gmartins@hotmail.com',
      content: 'Olá, tudo bem?'
    } as MessageUser;

    const messageAssistant = await sendMessageUseCase.execute(messageData);

    expect(messageAssistant.content).toBe('Olá tudo bem e você ?');
    expect(messageAssistant.sender).toBe('Assistente Virtual');
  });

  it('should not be able to send a message to AI when the user does not exist', async () => {
    const messageData = {
      sender: 'carlos@hotmail.com',
      content: 'Olá, tudo bem?'
    } as MessageUser;

    expect(async () => {
      await sendMessageUseCase.execute(messageData);
    }).rejects.toThrow(
      'O Usuário informado não existe, por isso não será possível enviar sua mensagem!'
    );
  });
});
