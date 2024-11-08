import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middlewares/logger.middleware';
import { HttpExceptionFilter } from './\bfilters/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 미들웨어를 전역으로 적용. 그러나 이렇게 사용하는 경우DI에 접근할 수 없다.
  // 따라서 의존성 주입이 없는 함수형 미들웨어를 사용하거나,
  // 의존성이 필요한 경우 클래스 미들웨어를 만들어 앱 모듈 등의 모듈에 등록하고 .forRoutes('*') 메소드를 사용해야 한다.
  // 의존성이 없는 클래스 미들웨어의 경우 다음과 같이 사용도 가능하다.
  // app.use(new LoggerMiddleware()); <- 인스턴스를 직접 생성해서 사용
  app.use(logger);
  app.useGlobalFilters(new HttpExceptionFilter)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
