import { MessageAssistant } from '../MessageAssistant';

describe('Model MessageAssistant', () => {
  it('should create MessageAssistant', () => {
    const messageAssistant = MessageAssistant.create(
      'Uma mensagem da Assistente',
      'Nome da Assistente'
    );

    expect(messageAssistant).toBeInstanceOf(MessageAssistant);
    expect(messageAssistant.content).toBe('Uma mensagem da Assistente');
    expect(messageAssistant.sender).toBe('Nome da Assistente');
    expect(messageAssistant.id).toBeDefined();
  });
});
