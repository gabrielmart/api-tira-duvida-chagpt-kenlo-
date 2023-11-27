import crypto from 'crypto';
import { BadRequestError } from '../../errors/BadRequestError';
import { Message } from '../IMessage';

export class MessageUser implements Message {
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
    this.validateSender(sender);
    return new MessageUser(content, sender, id);
  }

  private static validateSender(email: string): boolean {
    const regex = new RegExp(
      '^\\w+([\\.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$'
    );

    const emailIsValid = regex.test(email);
    if (emailIsValid) return emailIsValid;

    throw new BadRequestError(
      'Rementente Inválido! \nPor gentileza informar email com formato correto - Exemplo: email@dominio.com'
    );
  }
}
