import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BoardRepository } from './board.repository'; // -> ts 0.3 이상에서는 Repository 직접 주입
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

@Module({
  imports: [
    // TypeOrmModule.forFeature([BoardRepository])
    TypeOrmModule.forFeature([Board]) // -> Board만 등록
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}