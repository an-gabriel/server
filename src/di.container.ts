import { Container } from 'inversify';
import { HelloController } from './modules/base/controller/hello.controller';
import { HealthCheckController } from './modules/health-check/controller/health-check.controller';

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
    this.container.bind<HelloController>(HelloController).toSelf();
    this.container.bind<HealthCheckController>(HealthCheckController).toSelf();
  }
}
