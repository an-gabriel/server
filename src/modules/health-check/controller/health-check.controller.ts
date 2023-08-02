import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { PathRoutes } from '../../../enum/path-routes';

@controller(PathRoutes.HEALTH_CHECK)
export class HealthCheckController {
  @httpGet(PathRoutes.DEFAULT)
  public index(req: Request, res: Response) {
    const healthCheck = {
      uptime: process.uptime(),
      message: 'ON',
      timestamp: Date.now(),
    };

    res.send(healthCheck);
  }
}
