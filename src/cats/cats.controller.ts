
import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
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

  // @Get()
  // async findAll(): Promise<Cat[]> {
  //   return this.catsService.findAll();
  // }

  // @Get()
  // async findAll() {
  //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    // HttpException은 예외처리를 위해 NestJs에서 제공하는 표준 에러 처리 클래스이다.
    // 첫 번째 파라미터는 response(-> message))로 response body에 들어갈 스트링 또는 오브젝트 형태의 값을 넘겨야 한다. 오브젝트의 경우 nest.js에서 자동 직렬화.
    // 두 번째 파라미터는 상태 코드(statusCode)이다. HttpStatus의 enum을 사용하는 것이 권장된다. 이 두 파라미터는 필수로 입력해 줘야 한다.
    // 세 번째 파라미터는 options이다. 에러 원인을 제공하는 데 주로 사용되며 자동으로 직렬화 되지 않는다.
    // {"statusCode":403,"message":"Forbidden"}
  // }


  @Get()
  async findAll() : Promise<Cat[]> {
    try {
      throw new Error() // 일부러 에러 발생시키기.
      return await this.catsService.findAll()
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }


}
