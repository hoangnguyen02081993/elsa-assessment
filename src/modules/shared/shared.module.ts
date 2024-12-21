import { Global, Module } from '@nestjs/common';
import { HttpModule } from '../http';
import { InternalSocketManagerService } from './services/socket-manager.service';
import { InternalAuthService } from './services/auth.service';
import { InternalQuizAPIService } from './services/quiz-api.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    InternalSocketManagerService,
    InternalAuthService,
    InternalQuizAPIService,
  ],
  exports: [
    InternalSocketManagerService,
    InternalAuthService,
    InternalQuizAPIService,
  ],
})
export class SharedModule {}
