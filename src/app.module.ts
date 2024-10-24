import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';

@Module({
    // CatsModule을 구성하고 가져옴으로 인해서 CatsController와 CatsService를 직접 등록해줄 필요가 없다.
  imports: [CatsModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
