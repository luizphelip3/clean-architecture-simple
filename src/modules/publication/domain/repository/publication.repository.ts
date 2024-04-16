import { removeUndefinedParams } from '@modules/shared/utils/remove-undefined-params';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { Publication } from '..';

export interface IPublicationRepository {
  create(publication: Publication): Promise<Publication>;

  update(publication: Publication): Promise<UpdateMethodResult>;

  findAll(): Promise<Publication[]>;

  findById(id: string): Promise<Publication | null>;

  findOne(params: Partial<Publication>): Promise<Publication | null>;
}

class UpdateMethodResult {
  raw: any;
  affected?: number;
  generatedMaps: ObjectLiteral[];
}

@Injectable()
export class PublicationTypeOrmRepository implements IPublicationRepository {
  constructor(
    @Inject('PUBLICATION_REPOSITORY')
    private publicationTypeOrmRepository: Repository<Publication>,
  ) {}

  async create(publication: Publication): Promise<Publication> {
    try {
      return await this.publicationTypeOrmRepository.save(publication);
    } catch (error) {
      throw new InternalServerErrorException('Could not create publication.');
    }
  }

  async update(publication: Publication): Promise<UpdateMethodResult> {
    try {
      return await this.publicationTypeOrmRepository.update(
        publication.id,
        publication,
      );
    } catch (error) {
      throw new InternalServerErrorException('Could not update publication.');
    }
  }

  async findAll(): Promise<Publication[]> {
    return await this.publicationTypeOrmRepository.find();
  }

  async findById(id: string): Promise<Publication | null> {
    return await this.publicationTypeOrmRepository.findOneBy({ id });
  }

  async findOne(params: Partial<Publication>): Promise<Publication | null> {
    const validParams = removeUndefinedParams(params);
    return await this.publicationTypeOrmRepository.findOne({
      where: validParams,
    });
  }
}
