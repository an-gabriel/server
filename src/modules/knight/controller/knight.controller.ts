import { Request, Response } from 'express';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { PathRoutes } from '../../../enum/path-routes';
import { inject } from 'inversify';
import { KnightService } from '../service/knight.service';
import KnightDocument, { AttributesKnight } from '../interface/knight';

@controller(PathRoutes.BASE_PATH)
export class KnightController {
  constructor(
    @inject(KnightService) private readonly knightService: KnightService,
  ) {}

  @httpGet(`${PathRoutes.DEFAULT}`)
  public async listBase(req: Request, res: Response) {
    try {
      const { filter } = req.query;

      let knight;

      if (!filter) {
        knight = await this.knightService.list();
      }

      if (filter === process.env.HEROES) {
        knight = await this.knightService.findHeroes();
      }

      res.status(200).send(JSON.stringify(knight));
    } catch (error) {
      res.status(500).send({ messagem: (error as Error).message });
    }
  }

  @httpGet(`/:id`)
  public async find(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let knight;

      if (!!id) {
        knight = await this.knightService.find(id);
      }

      if (!knight) {
        throw new Error('we found no knight');
      }

      res.status(200).send(JSON.stringify(knight));
    } catch (error) {
      res.status(500).send({ messagem: (error as Error).message });
    }
  }

  @httpPost(PathRoutes.CREATE)
  public async create(req: Request, res: Response) {
    try {
      let bodyKnight = req.body as unknown as KnightDocument;
      const { keyAttribute, attributes } = bodyKnight;

      const keyAttr = keyAttribute as keyof AttributesKnight;

      const keyAttributeValue = !attributes ? 0 : attributes[keyAttr];

      const equippedWeapon = bodyKnight.weapons.filter(
        (weapons) => weapons.equipped,
      );

      const equippedWeaponModifier =
        equippedWeapon[equippedWeapon.length - 1].mod;

      const keyAttributeModifier = this.modTable(keyAttributeValue);

      const attack =
        10 + Math.abs(keyAttributeModifier) + equippedWeaponModifier;

      console.log(
        attack,
        keyAttributeModifier,
        equippedWeaponModifier,
        equippedWeapon,
      );

      if (!bodyKnight.attributes) {
        bodyKnight.attributes = {} as AttributesKnight;
      }

      bodyKnight.attributes[keyAttr] = attack;

      const knight = await this.knightService.save(bodyKnight);

      res.status(200).json(knight);
    } catch (error) {
      res.status(500).send({ messagem: (error as Error).message });
    }
  }

  public modTable(value: number): number {
    const mappedMod = new Map([
      [0, -2],
      [1, -2],
      [2, -2],
      [3, -2],
      [4, -2],
      [5, -2],
      [6, -2],
      [7, -2],
      [8, -2],
      [9, -1],
      [10, -1],
      [11, 0],
      [12, 0],
      [13, 1],
      [14, 1],
      [15, 1],
      [16, 2],
      [17, 2],
      [18, 2],
      [19, 3],
      [20, 3],
    ]);

    const modRetuned = mappedMod.get(value);

    if (modRetuned) {
      return modRetuned!;
    }

    if (value > 20) {
      return 3;
    }

    return -2;
  }

  @httpPut(`${PathRoutes.UPDATE}/:id`)
  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.knightService.update({ _id: id, ...req.body });

      res.status(200).json({ message: 'Information has been changed' });
    } catch (error) {
      res.status(500).send({ messagem: (error as Error).message });
    }
  }

  @httpDelete(`${PathRoutes.DELETE}/:id`)
  public async delete(req: Request, res: Response) {
    try {
      console.log('oi');
      const { id } = req.params;

      await this.knightService.delete({ _id: id });

      res.status(200).json({ message: 'Information has been changed' });
    } catch (error) {
      res.status(500).send({ messagem: (error as Error).message });
    }
  }
}
