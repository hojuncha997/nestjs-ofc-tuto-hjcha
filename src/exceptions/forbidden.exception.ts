import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomForbiddenException extends HttpException {
    constructor() {
        super('CustomForbidden', HttpStatus.FORBIDDEN)
    }
}

/*
  custom exception:
  nestJS에 내장된 HTTP 예외 이외의 예외를 설정하고 싶은 경우,
  이처럼 HttpException을 상속하여 만든 것도 좋은 방법이다.
  왜냐하면 nest가 이것이 에러라는 것을 감지하고 자동적으로 에러 리스펀스를 다뤄주기 때문이다.
*/