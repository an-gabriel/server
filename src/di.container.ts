import { Container } from 'inversify';
import { HealthCheckController } from './modules/health-check/controller/health-check.controller';
import { KnightController } from './modules/knight/controller/knight.controller';
import { KnightService } from './modules/knight/service/knight.service';

export class DiContainer {
  private static container: Container;

  public static getContainer(): Container {
    if (!this.container) {
      this.container = new Container();
      this.registerControllers();
    }
    return this.container;
  }

  private static registerControllers(): void {
    this.container.bind<HealthCheckController>(HealthCheckController).toSelf();
    this.container.bind<KnightController>(KnightController).toSelf();
    this.container.bind<KnightService>(KnightService).toSelf();
  }
}
