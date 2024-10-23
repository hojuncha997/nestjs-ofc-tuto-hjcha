
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  // private final CatsService catsService 과 유사. 캣서비스 인스턴스를 주입받아 사용
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  /*
  위와 같으나 await와 Promise를 사용하여 비동기 처리를 명시적으로 표현
  
  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<void> {
    await this.catsService.create(createCatDto);
  }

  */

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
