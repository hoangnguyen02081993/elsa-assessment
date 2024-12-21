import { Method } from 'axios';
import { InternalHttpClientService } from 'src/modules/http';

export abstract class BaseAPIGatewayController {
  constructor(
    private readonly httpService: InternalHttpClientService,
    private readonly baseUrl: string,
  ) {}
  public forward(path: string, method: Method) {
    return this.httpService.forwardFromRequest(
      this.buildFullPath(path),
      method,
    );
  }

  private buildFullPath(path: string) {
    return `${this.baseUrl}${path}`;
  }
}
