import Knights from '../models/knights.model';
import KnightDocument from '../interface/knight';
import { injectable } from 'inversify';

interface KnightsDTO {
  _id: string;
  nickname: string;
}

export interface FinallyOperation {
  message: string;
}
@injectable()
export class KnightService {
  public async list(): Promise<KnightDocument[]> {
    const knight = await Knights.find();

    return knight;
  }

  public async findHeroes(): Promise<KnightDocument[]> {
    const knight = await Knights.find({ deleted: true });

    return knight;
  }

  public async find(id: string): Promise<KnightDocument | null> {
    const knight = await Knights.findOne({ _id: id, deleted: false });

    return knight;
  }

  public async save(filters: KnightDocument): Promise<KnightDocument> {
    const knight = new Knights(filters);
    await knight.save();

    return knight.toJSON();
  }

  public async update({ _id, ...rest }: KnightsDTO): Promise<FinallyOperation> {
    await Knights.findByIdAndUpdate(_id, {
      $set: rest,
    });

    return { message: 'Information has been changed' };
  }

  public async delete({
    _id,
  }: Omit<KnightsDTO, 'nickname'>): Promise<FinallyOperation> {
    console.log(_id);
    await Knights.findByIdAndUpdate(_id, { deleted: true }, { new: true });

    return { message: 'Information has been changed' };
  }
}
