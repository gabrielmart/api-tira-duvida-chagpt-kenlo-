import OpenAI from 'openai';
import { Message } from '../../../models/IMessage';
import { IChatService } from '../IChatService';
import { MessageAssistant } from '../../../models/MessageAssistant';

export class OpenAIChatService implements IChatService {
  async ask(message: Message): Promise<MessageAssistant | null> {
    const openai = new OpenAI();

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: message.content
        }
      ],
      model: 'gpt-3.5-turbo-1106'
    });

    const { role, content } = completion.choices[0].message;

    const messageAssistant = MessageAssistant.create(content!, role);

    return messageAssistant;
  }
}
