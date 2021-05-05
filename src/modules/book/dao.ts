import { Pagination } from '@common/interface';
import { Injectable } from '@nestjs/common';
import {
  Op,
  FindOptions,
  FindPaginationOptions,
  PaginationResult,
} from '@model/shared';
// import { Book } from '@model/index';

import {
  FindBookDto,
  CreateBookDto,
  UpdateBookDto,
  FindBookPaginationDto,
} from './dto';
import { Book } from '@model/book';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BookDao {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book
  ) {}

  public async create(dto: CreateBookDto) {
    const { id, title, auther, details } = await Book.create(dto);
    return { id, title, auther, details } as Book;
  }

  public async update(dto: UpdateBookDto) {
    const { id, title, auther, details } = dto;

    const entity = {};
    if (title) entity['title'] = title;
    if (auther) entity['auther'] = auther;
    if (details) entity['details'] = details;
    const result = await Book.update(entity, { where: { id }});

    return result;
  }

  public async findOne(dto: FindBookDto) {
    const options: FindOptions = { where: {}};

    if (dto) {
      const { id, title, auther } = dto;

      if (id) options.where['id'] = id;
      if (auther) options.where['auther'] = auther;
      if (title) options.where['title'] = { [Op.like]: `%${dto.title}%` };
    }

    const result = await Book.findOne(options);
    return result;
  }

  public async findPagination(
    dto: FindBookPaginationDto,
    pagination: Pagination
  ): Promise<PaginationResult<Book>> {
    const options: FindPaginationOptions = {
      where: {},
      pagination,
    };

    if (dto) {
      const { id, title, auther } = dto;
      if (id) options.where['id'] = id;
      if (title) options.where['title'] = title;
      if (auther) options.where['auther'] = auther;
    }

    const result = await Book.findPagination<Book>(options);
    return result;
  }
}
