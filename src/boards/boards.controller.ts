import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import * as BoardModel from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create_board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard() : BoardModel.Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post()
    createBoard( @Body() createBoardDto: CreateBoardDto ) : BoardModel.Board {
        return this.boardsService.createBoard(
            createBoardDto.title,
            createBoardDto.description,
        );
    }

    @Get('/:id')
    getBoardById( @Param('id') id: string ) : BoardModel.Board {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard( @Param('id') id: string ) : void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus( @Param('id') id: string, @Body('status') status: BoardModel.BoardStatus ) : BoardModel.Board {
        return this.boardsService.updateBoardStatus(id, status);
    }
}