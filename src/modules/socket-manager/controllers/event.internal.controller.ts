import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { LeaderBoardChangedDataEventRequest, LeaderBoardEventRequest } from '../models/update-leader-board';

@Controller({
  path: ['/internal/api/v1.0/events'],
  version: ['1.0'],
})
export class InternalEventsController {
  constructor(private readonly eventSevice: EventService) {}

  @Post('leaderboard')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateLeaderBoard(
    @Body() data: LeaderBoardEventRequest,
  ): Promise<void> {
    await this.eventSevice.executeUpdateLeaderBoard(data);
  }

  @Post('self-score')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateSelfScore(@Body() data: LeaderBoardChangedDataEventRequest): Promise<void> {
    await this.eventSevice.executeUpdateSelfScore(data);
  }
}
