import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserRepository } from './user.repository';  // -> ts 0.3 이상에서는 Repository 직접 주입
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret27',  // 실제 서비스에서는 .env 파일로 관리 필요
      signOptions: {
        expiresIn: 3600,      // 토큰 유효시간 : 1시간
      },
    }),
    // TypeOrmModule.forFeature([UserRepository])
    TypeOrmModule.forFeature([User]) // -> User만 등록
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
