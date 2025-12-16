import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {

    // 다른 컴포넌트에서 수정할 수 없도록 private로 설정
    private boards : Board[] = [];

    getAllBoards() : Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) : Board {
        const board : Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        };

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string) : Board {
        const found = this.boards.find(board => board.id === id);
        if (!found) {
            throw new NotFoundException(`Board with ID "${id}" not found.`);
        }
        return found;
    }

    deleteBoard(id: string) : void {
        this.boards = this.boards.filter(board => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus) : Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
