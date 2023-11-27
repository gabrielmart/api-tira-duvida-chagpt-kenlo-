// import testDB from '../../../test/connect-db';
import request from 'supertest';
import { app } from '../../app';
import { MongoClient } from '../../database/mongoClient';
import { User } from '../../models/User';

describe('Create User Controller', () => {
  beforeEach(async () => {
    await MongoClient.connect();
    await MongoClient.client
      .db(process.env.MONGODB_DATABASE_NAME)
      .collection<Partial<User>>('users')
      .insertOne({
        fullName: 'Gabriel Martins',
        email: 'carlos@hotmail.com',
        phone: '11982511217'
      });
  });

  afterEach(async () => {
    await MongoClient.client
      .db(process.env.MONGODB_DATABASE_NAME)
      .collection('users')
      .deleteMany();
    await MongoClient.client.close();
  });

  afterAll(async () => {
    await MongoClient.connect();
    await MongoClient.client
      .db(process.env.MONGODB_DATABASE_NAME)
      .dropDatabase();
    await MongoClient.client.close();
  });

  it('Should not be possible to send message when passing a numeral character in the message field', async () => {
    const response = await request(app).post('/ask-gpt').send({
      message: 123456,
      email: 'gmartins@hotmail.com'
    });

    expect(response.text).toBe('O campo message é do tipo texto!');
    expect(response.status).toBe(400);
  });

  it('Should not be possible to send a message when the message field is not provided', async () => {
    const response = await request(app).post('/ask-gpt').send({
      email: 'gmartins@hotmail.com'
    });

    expect(response.text).toBe('O campo message é um campo obrigatório!');
    expect(response.status).toBe(400);
  });

  it('Should not be possible to send message when passing a numeral character in the email field', async () => {
    const response = await request(app).post('/ask-gpt').send({
      message: 'Uma duvida',
      email: 123456
    });

    expect(response.text).toBe('O campo email é do tipo texto!');
    expect(response.status).toBe(400);
  });

  it('Should not be possible to send message when the email field must contain a valid format.', async () => {
    const response = await request(app).post('/ask-gpt').send({
      message: 'Uma duvida',
      email: 'ga@.com'
    });

    expect(response.text).toBe(
      'O campo email deve conter um formato valido. Ex: email@dominio.com'
    );
    expect(response.status).toBe(400);
  });

  it('Should not be possible to create a new user when the email field is not provided', async () => {
    const response = await request(app).post('/ask-gpt').send({
      message: 'Uma duvida'
    });

    expect(response.text).toBe('O campo email é um campo obrigatório!');
    expect(response.status).toBe(400);
  });

  it('Should not send a message when the email provided is from a non-existent user', async () => {
    const response = await request(app).post('/ask-gpt').send({
      message: 'Uma duvida',
      email: 'gmartins@hotmail.com'
    });

    expect(response.text).toBe(
      'O Usuário informado não existe, por isso não será possível enviar sua mensagem!'
    );

    expect(response.status).toBe(401);
  });

  it('Should send a message and receive a response from the chat service', async () => {
    const response = await request(app).post('/ask-gpt').send({
      message: 'Quem foi o artilheiro da copa do mundo de 2002?',
      email: 'carlos@hotmail.com'
    });

    expect(response.body.response).toBeDefined();
    expect(response.body.sender).toBeDefined();
  });
});

describe('', () => {
  it('Should send a message and receive a response from the chat service', async () => {
    const response = await request(app).get('/').send();

    expect(response.text).toBe('Bem vindo a Tira Duvida ChatGPT Kenlo!');
  });
});
