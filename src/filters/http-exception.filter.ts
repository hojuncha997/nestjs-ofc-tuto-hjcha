import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

/**
* HTTP 예외를 처리하는 필터
* NestJS에서 발생하는 HttpException을 잡아서 일관된 형식의 응답으로 변환
*/
@Catch(HttpException) // HttpException 타입의 예외만 캐치
export class HttpExceptionFilter implements ExceptionFilter {
 /**
  * 예외를 처리하는 메소드
  * @param exception 발생한 HTTP 예외 객체
  * @param host ArgumentsHost 객체 (실행 컨텍스트를 포함)
  */
 catch(exception: HttpException, host: ArgumentsHost) {
   // HTTP 컨텍스트로 전환 (Express의 Request/Response 객체에 접근하기 위해)
   const ctx = host.switchToHttp();
   // Response 객체 가져오기
   const response = ctx.getResponse<Response>();
   // Request 객체 가져오기
   const request = ctx.getRequest<Request>();
   // 예외의 HTTP 상태 코드 가져오기
   const status = exception.getStatus();

   // 클라이언트에게 에러 응답 전송
   response
     .status(status)  // HTTP 상태 코드 설정
     .json({
       statusCode: status,         // 상태 코드
       timestamp: new Date().toISOString(),  // 발생 시간
       path: request.url,          // 요청 URL
     });
 }
}