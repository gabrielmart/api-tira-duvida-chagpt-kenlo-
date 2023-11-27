import { User } from '../../../models/User';
import { IUsersRepository } from '../../UserRepository/IUsersRepository';

class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async exists(email: string): Promise<boolean> {
    const user = this.users.some((user) => user.email === email);
    return user;
  }

  async find(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user!;
  }
  async update(user: User): Promise<boolean> {
    const userIndex = this.users.findIndex(
      (userArray) => user.email === userArray.email
    );

    this.users[userIndex] = user;

    return true;
  }
}

export { InMemoryUsersRepository };
