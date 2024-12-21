import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { NotRequireAuthentication } from 'src/decorators';
import { UserService } from '../services/user.service';
import { GetByIdsRequest, UserProfile } from '../models/user';

@Controller({
  path: ['/internal/api/v1.0/users'],
  version: ['1.0'],
})
@NotRequireAuthentication()
export class InternalUserController {
  constructor(private readonly userService: UserService) {}

  @Get('/by-ids')
  @HttpCode(HttpStatus.OK)
  async getsByIds(@Query() data: GetByIdsRequest): Promise<UserProfile[]> {
    return this.userService.getByIds(data.userIds);
  }
}
