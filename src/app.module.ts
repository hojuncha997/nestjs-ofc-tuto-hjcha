import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
// import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { logger } from './common/middlewares/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './\bfilters/http-exception.filter';
// import * as cors from 'cors';
// import * as helmet from 'helmet';
@Module({
    // CatsModule을 구성하고 가져옴으로 인해서 CatsController와 CatsService를 직접 등록해줄 필요가 없다.
  imports: [CatsModule],

  providers: [
  
    { // 이 방식으로 전역 필터를 등록해 준다.
      provide: APP_FILTER,
      useClass: HttpExceptionFilter // 커텀 필터 등록
    }
  ]
})
export class AppModule implements NestModule {
  // configure()는 async/await를 적용해서도 사용 가능
  // consumer는 헬퍼 클래스로 미들웨어를 적용하는 데 사용한다. 미들웨어를 관리하는 메소드들을 가지고 있다.
  // 그러한 메소드들은 유동적으로 연결돼 있으며, forRoutes() 메소드의 경우 다양한 아규먼트를 받을 수 있다.
  // 그렇지만 이 메소드에는 주로 컴마로 구분된 컨트롤러 모듈 리스트를 넣는 경우가 많다.
  // apply() 메소드 역시 단일 또는 복수의 미들웨어를 받을 수 있다.
  configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(LoggerMiddleware)
      // .apply(cors(), helmet(), logger)
      .apply(logger)
      .exclude(
        { path: 'cats', method: RequestMethod.GET }, //RouteInfo 객체 형태
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)'
      )
      .forRoutes(CatsController)
    // .forRoutes({
    //   path: 'cats',
    //   method: RequestMethod.GET,
    // });
  }
}
