import { Interaction } from '../Interaction';
import { MessageAssistant } from '../MessageAssistant';
import { MessageUser } from '../MessageUser';

describe('Model Interaction', () => {
  const messageUser = MessageUser.create(
    'Uma mensagem do usuário',
    'emailDoUsuario@dominio.com'
  );

  const messageAssistant = MessageAssistant.create(
    'Uma mensagem da assistente',
    'emailDoUsuario@dominio.com'
  );

  it('should create Interaction', () => {
    const interaction = Interaction.create(messageUser, messageAssistant);

    expect(interaction).toBeInstanceOf(Interaction);
    expect(interaction.messageUser.content).toBe('Uma mensagem do usuário');
    expect(interaction.messageAssistant.content).toBe(
      'Uma mensagem da assistente'
    );
    expect(interaction.id).toBeDefined();
  });
});
