import { MessageUser } from '.';

describe('Model MessageUser', () => {
  it('should create Interaction', () => {
    const messageUser = MessageUser.create(
      'Uma mensagem do usuário',
      'email@dominio.com'
    );

    expect(messageUser).toBeInstanceOf(MessageUser);
    expect(messageUser.content).toBe('Uma mensagem do usuário');
    expect(messageUser.sender).toBe('email@dominio.com');
    expect(messageUser.id).toBeDefined();
  });

  it('should not create MessageUser with email without a domain', () => {
    expect(() => {
      MessageUser.create('Uma mensagem do usuário', 'email@.com');
    }).toThrow(
      'Rementente Inválido! \nPor gentileza informar email com formato correto - Exemplo: email@dominio.com'
    );
  });
});
