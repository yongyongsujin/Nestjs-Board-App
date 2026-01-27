// 해당 파일을 다른 곳에서 주입하여 사용가능하도록 @Injectable() 데코레이터 추가
import { Injectable, UnauthorizedException } from '@nestjs/common';

// PassportStrategy를 상속받아 JWT 전략을 구현
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { UserRepository } from './user.repository'; // -> ts 0.3 이상에서는 Repository 직접 주입
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

// config/default.yml 파일로부터 시크릿 키와 만료 시간 불러오기
import config from 'config';
const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret, // 토큰 유효성 검증용 시크릿 키 (auth 모듈과 동일한 값이어야 함)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 요청 헤더의 Bearer 토큰에서 JWT 추출
    });
  }

  // JWT 토큰의 페이로드(유저정보)가 DB 에 있는 정보와 일치하는지 검증하는 메서드
  async validate(payload: { username: string }) {
    const { username } = payload;
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // req.user에 저장됨
  }
}