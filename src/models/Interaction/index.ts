import crypto from 'crypto';
import { MessageUser } from '../MessageUser';
import { MessageAssistant } from '../MessageAssistant';

export class Interaction {
  private constructor(
    private _messageUser: MessageUser,
    private _messageAssistant: MessageAssistant,
    readonly id: string
  ) {}

  get messageUser(): MessageUser {
    return this._messageUser;
  }

  get messageAssistant(): MessageAssistant {
    return this._messageAssistant;
  }

  static create(
    userMessage: MessageUser,
    assistantMessage: MessageAssistant,
    id: string = crypto.randomBytes(12).toString('hex')
  ): Interaction {
    return new Interaction(userMessage, assistantMessage, id);
  }
}
