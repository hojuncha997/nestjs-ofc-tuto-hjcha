//함수 방식의 미들웨어 생성
import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
}

// 만약 미들웨어가 의존성 주입도 없고, 멤버 변수도 없는 등 간단한 경우에는 함수 방식으로 미들웨어를 생성할 수 있다.
// 이 경우 미들웨어를 컨트롤러에 @UseInterceptor(logger) 처럼 적어 사용할 수도 있다. 그러나 app.module.ts에 적어주는 편이 여러모로 편리하다.
// 그러나 의존성 주입이 필요한 경우에는 클래스 방식의 미들웨어를 사용해야 한다.


// 로그 출력하는 클래스 방식의 미들웨어 생성
// import { Injectable, NestMiddleware } from "@nestjs/common";
// import { Request, Response, NextFunction } from "express";

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//     use(req: Request, res: Response, next: NextFunction) {
//         console.log('Request...');
//         next();
//     }
// }


