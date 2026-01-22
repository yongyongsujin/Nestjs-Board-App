import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BoardRepository } from './board.repository'; // -> ts 0.3 이상에서는 Repository 직접 주입
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]) // -> Board만 등록
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}