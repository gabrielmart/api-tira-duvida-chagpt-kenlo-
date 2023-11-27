import crypto from 'crypto';
import { Message } from '../IMessage';

export class MessageAssistant implements Message {
  private constructor(
    readonly content: string,
    readonly sender: string,
    readonly id: string
  ) {
    this.content = content;
    this.sender = sender;
    this.id = id;
  }

  static create(
    content: string,
    sender: string,
    id: string = crypto.randomBytes(12).toString('hex')
  ): Message {
    return new MessageAssistant(content, sender, id);
  }
}
