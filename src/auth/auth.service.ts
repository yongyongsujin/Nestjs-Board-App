import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { UserRepository } from './user.repository'; // -> ts 0.3 이상에서는 Repository 직접 주입
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import bcrypt from 'node_modules/bcryptjs';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        // @InjectRepository(UserRepository)
        // private userRepository: UserRepository
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialsDto : AuthCredentialsDto): Promise<void> {
        // return this.userRepository.createUser(authCredentialsDto);
        const { username, password } = authCredentialsDto;

        // salt + 평문비밀번호 -> 비밀번호 해싱
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({ username, password: hashedPassword });
        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {   // 중복된 username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<{ accessToken : string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });
        
        if (user && await bcrypt.compare(password, user.password)) {
            // 유저 토큰 생성 (Secreet + Payload -> 토큰)
            const payload = { username }; // 토큰을 이용해 정보를 가져가기 쉬우므로 중요한 정보는 넣지 않는 것이 좋음
            const accessToken = this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}