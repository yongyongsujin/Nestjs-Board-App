import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
// import { BoardRepository } from './board.repository'; // -> ts 0.3 이상에서는 Repository 직접 주입
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create_board.dto';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) { }

    // // 다른 컴포넌트에서 수정할 수 없도록 private로 설정
    // private boards : Board[] = [];

    // getAllBoards() : Board[] {
    //     return this.boards;
    // }
    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    // createBoard(title: string, description: string) : Board {
    //     const board : Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     };

    //     this.boards.push(board);
    //     return board;
    // }
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });
        await this.boardRepository.save(board);
        return board;
    }

    // getBoardById(id: string) : Board {
    //     const found = this.boards.find(board => board.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Board with ID "${id}" not found.`);
    //     }
    //     return found;
    // }
    async getBoardById(id: number): Promise<Board> {
        /** 
         * TypeORM 0.3 이상에서는 findOne(id)가 제거되었고,
         * 반드시 findOneBy({ id }) 또는 findOne({ where: { id } })를 사용해야 한다.
         */
        const found = await this.boardRepository.findOneBy({ id });
        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    // deleteBoard(id: string) : void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter(board => board.id !== found.id);
    // }
    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        // console.log('result: ', result);
        // - result:  DeleteResult { raw: [], affected: 0 } or result:  DeleteResult { raw: [], affected: 1 }
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    // updateBoardStatus(id: string, status: BoardStatus) : Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
}
