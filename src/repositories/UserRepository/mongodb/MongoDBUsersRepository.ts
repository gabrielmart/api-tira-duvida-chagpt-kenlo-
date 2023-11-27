/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongoClient } from '../../../database/mongoClient';
import { BadRequestError } from '../../../errors/BadRequestError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { User } from '../../../models/User';
import { IUsersRepository } from '../IUsersRepository';

class MongoDBUsersRepository implements IUsersRepository {
  async exists(email: string): Promise<boolean> {
    const user = await MongoClient.db
      .collection<User>('users')
      .findOne({ email });

    return !!user;
  }

  async create({
    fullName,
    email,
    phone,
    interactions,
    id
  }: User): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection<User>('users')
      .insertOne({
        id,
        fullName,
        email,
        phone,
        interactions
      });

    const userMongo = await MongoClient.db
      .collection<User>('users')
      .findOne({ _id: insertedId });

    if (!userMongo)
      throw new UnauthorizedError('Não foi possível criar o usuário');

    const { _id, ...rest } = userMongo;

    return { ...rest } as User;
  }

  async find(email: string): Promise<User | null> {
    const userMongo = await MongoClient.db
      .collection<User>('users')
      .findOne({ email });

    if (!userMongo) return null;

    const { _id, ...rest } = userMongo;

    return { ...rest } as User;
  }

  async update(user: User): Promise<boolean> {
    const userMongo = await MongoClient.db
      .collection<User>('users')
      .updateOne({ email: user.email }, { $set: user });

    return !!userMongo.upsertedId;
  }
}

export { MongoDBUsersRepository };
