
import { Controller, Get, Post, Param, HttpCode, Redirect, Query, Body } from '@nestjs/common';
import { CreateCatDto } from '../dto/create-cat.dto';

@Controller('cats')
export class CatsController {

//   @Post()
//   create(): string {
//     return 'This action adds a new cat';
//   }


    // @Post()
    // @HttpCode(204)
    // create() {
    // return 'This action adds a new cat';
    // }


    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        // @Body()는 스프링의 @RequestBody와 같은 역할
        return 'This action adds a new cat';
    }



    @Get() // localhost:3000/cats
    findAll(): string {
        return 'This action returns all cats';
    }

    @Get('breed') // localhost:3000/cats/breed
    findBreed(): string {
        return 'This action returns all cats breed';
    }

   

    @Get('ab*cd') // localhost:3000/cats/ab*cd
    findWild(): string {
        return 'This route uses a wildcard';
    }


    @Get('docs') // localhost:3000/cats/docs
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {    // @Query는 스프링의 @RequestParam과 같은 역할
    if (version && version === '5') {
        return { url: 'https://docs.nestjs.com/v5/' };
    }
    }

    // NestJS에서는 라우트를 정의한 순서대로 매칭을 시도.
    // 현재 코드에서는 :id 파라미터를 사용하는 라우트가 docs 라우트보다 먼저 정의되어 있어서 문제가 발생
    @Get(':id') // localhost:3000/cats/1
    findOne(@Param('id') id: string): string { // @Param은 스프링의 @PathVariable과 같은 역할
        return `This action returns a #${id} cat`;
    }

    /*
    @Get(':id')
    findOne(@Param() params: any): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }
    */

}

/*
생성한 컨트롤러는 항상 모듈에 속해야 한다.
만약 모듈에 추가하지 않으면, nest.js가 컨트롤러의 존재를 알지 못하므로 인스턴스를 생성하지 않는다.

모듈의 controllers 배열에 추가하는 것으로 컨트롤러를 모듈에 등록할 수 있다.
아직 다른 모듈을 정의하지 않았기 때문에, 루트 AppModule을 사용하여 CatsController를 추가한다.

app.module.ts
*/