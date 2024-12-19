import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { InternalUserController } from './controllers/user.controller';
@Module({
  imports: [],
  controllers: [AuthController, InternalUserController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
