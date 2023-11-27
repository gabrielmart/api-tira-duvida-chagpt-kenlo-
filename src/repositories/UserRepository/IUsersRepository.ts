import { User } from '../../models/User';

export interface IUsersRepository {
  create(user: User): Promise<User>;
  exists(email: string): Promise<boolean>;
  find(email: string): Promise<User | null>;
  update(user: User): Promise<boolean>;
}
