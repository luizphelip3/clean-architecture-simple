import { CurrentUser } from '@modules/auth/presentation/decorators/current-user.decorator';
import { FindAllPublicationsUseCase } from '@modules/publication/application/use-cases/find-all-publications/find-all-publications.use-case';
import { Publication } from '@modules/publication/domain';
import { User } from '@modules/user/domain';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePublicationRequestDTO } from '..';
import { CreatePublicationUseCase } from '../../application';

@Controller()
export class PublicationController {
  constructor(
    private readonly createPublicationUseCase: CreatePublicationUseCase,
    private readonly findAllPublicationsUseCase: FindAllPublicationsUseCase,
  ) {}

  @Post('publication')
  async create(
    @Body() { description }: CreatePublicationRequestDTO,
    @CurrentUser() user: User,
  ): Promise<Publication> {
    return await this.createPublicationUseCase.execute({
      user,
      description,
    });
  }

  @Get('publications')
  async findAll(): Promise<Publication[]> {
    return await this.findAllPublicationsUseCase.execute();
  }
}
