import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BoardRepository } from './board.repository'; // -> ts 0.3 이상에서는 Repository 직접 주입
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([BoardRepository])
    TypeOrmModule.forFeature([Board]), // -> Board만 등록
    AuthModule, // -> @UseGuards(AuthGuard()) 사용위해 AuthModule 추가
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}