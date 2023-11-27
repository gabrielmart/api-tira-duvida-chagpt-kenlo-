import { MessageAssistant } from '../../models/MessageAssistant';
import { Message } from '../../models/IMessage';

export interface IChatService {
  ask(message: Message): Promise<MessageAssistant | null>;
}
