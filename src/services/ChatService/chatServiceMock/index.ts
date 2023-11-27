/* eslint-disable @typescript-eslint/no-unused-vars */
import { Message } from '../../../models/IMessage';
import { IChatService } from '../IChatService';
import { MessageAssistant } from '../../../models/MessageAssistant';

export class chatServiceMock implements IChatService {
  async ask(message: Message): Promise<MessageAssistant | null> {
    const completion = {
      choices: [
        {
          message: {
            role: 'Assistente Virtual',
            content: 'Olá tudo bem e você ?'
          }
        }
      ]
    };

    const { role, content } = completion.choices[0].message;

    const messageAssistant = MessageAssistant.create(content, role);

    return messageAssistant;
  }
}
