import { Injectable } from '@nestjs/common';
import { UserProfile } from '../models/user';

@Injectable()
export class UserService {
  async getByIds(userIds: string[]): Promise<UserProfile[]> {
    // Mock data
    return userIds.map((userId) => ({
      userId,
      username: userId,
    }));
  }
}
