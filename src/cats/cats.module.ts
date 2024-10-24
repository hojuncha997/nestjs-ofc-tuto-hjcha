import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()   // 이 모듈을 전역으로 설정하여 모듈 간에 공유할 수 있다. 그러나 모듈 등록을 한 번만 해야 해서 주로 루트 모듈에서 등록하여 사용한다.
@Module({ //스프링의 @Configuration과 유사한 역할
    controllers: [CatsController],
    providers: [CatsService],
    // 모듈 간 공유를 위해 export
    exports: [CatsService],
})
export class CatsModule {
    //이런 식으로 설정등의 목적을 위해 모듈에도 의존성 주입을 할 수 있다.
    // 그러나 모듈들은 다시 그 프로바이더에 주입되면 안된다. 순환 의존성 문제가 발생할 수 있다.
    constructor(private catsService: CatsService) {}

}


// 모듈은 컨트롤러, 서비스, 모듈 등을 포함할 수 있다.
// 이렇게 작성한 모듈을 다른 모듈에서 사용할 수 있다.
// 예를 들어 app.module.ts에서 CatsModule을 사용할 수 있다.
// 이렇게 하면 CatsModule에 포함된 컨트롤러, 서비스 등을 사용할 수 있다.

// 네스트에서의 모듈은 기본적으로 싱글톤으로 동작하기 때문에 여러 모듈에서 동일한 프로바이더 인스턴스를 공유할 수 있다.
// 이는 모듈 간의 상호작용을 쉽게 해주고, 코드의 재사용성을 높여준다.

// 모든 모들은 기본적으로 Shared module이다. 일단 생성되면 다른 모듈들에서 사용될 수 있다. 
// 만약 CatsService의 인스턴스를 여러 모듈 간에 공유하고 싶다면
// CatsService를 export 해야 한다. 이는 exports 배열을 만들어서 등록해 줌으로서 가능하다.
// 이렇게 되면 CatsModule을 임포트한 모듈은 CatsService에 접근할 수 있고 이 동일한 인스턴드를 다른 모듈들과 공유하여 사용할 수 있다.

// 물론 CatsService를 직접 모듈에 임포트하여 사용할 수 있다. 그러나 이 경우는 동일한 인스턴스르 공유하지 않는다.
// 이는 메모리 낭비를, 더 나아가서는 예상치 못한 결과를 초래할 수 있다.

// CatsService를 CatsModule에서 캡슐화하고 익스포트 함으로 인해서, CatsModule을 임포트한 모듈에서
// 동일한 CatsService 인스턴스를 공유하여 사용할 수 있도록 하는 것이다.

// 이 방식은 메모리를 절약 뿐 아니라, 모든 모들듈이 하나의 인스턴스를 공유하도록 함에 있어서 그 행위를 예측가능하게 한다.
// 또한 공유된 상태나 자원을 쉽게 관리할 수 있도록 해준다.

