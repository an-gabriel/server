import { Request, Response } from 'express';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { PathRoutes } from '../../../enum/path-routes';
import Base from '../models/base.model';

@controller(PathRoutes.BASE_PATH)
export class BaseController {
  @httpGet(PathRoutes.DEFAULT)
  public async listBase(req: Request, res: Response) {
    try {
      const BaseResult = await Base.find();
      res.status(200).json(BaseResult);
    } catch (error) {
      res.status(500).send({ messagem: (error as Error).message });
    }
  }

  @httpPost(PathRoutes.CREATE)
  public async createBase(req: Request, res: Response) {
    try {
      const base = new Base(req.body);
      await base.save();

      res.status(200).json(base.toJSON());
    } catch (error) {
      res.status(500).send({ messagem: (error as Error).message });
    }
  }

  @httpPut(`${PathRoutes.UPDATE}/:id`)
  public async updateBase(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await Base.findByIdAndUpdate(id, {
        $set: req.body,
      });

      res.status(200).json({ message: 'Information has been changed' });
    } catch (error) {
      res.status(500).send({ messagem: (error as Error).message });
    }
  }
}
