import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {BoardStatus} from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create_board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    // @Get('/')
    // getAllBoard() : BoardModel.Board[] {
    //     return this.boardsService.getAllBoards();
    // }
    @Get('/')
    getAllBoard() : Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard( @Body() createBoardDto: CreateBoardDto ) : BoardModel.Board {
    //     return this.boardsService.createBoard(
    //         createBoardDto.title,
    //         createBoardDto.description,
    //     );
    // }
    @Post()
    @UsePipes(ValidationPipe)
    createBoard( @Body() createBoardDto: CreateBoardDto ) : Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    // @Get('/:id')
    // getBoardById( @Param('id') id: string ) : BoardModel.Board {
    //     return this.boardsService.getBoardById(id);
    // }
    @Get('/:id')
    getBoardById( @Param('id') id: number ) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    // @Delete('/:id')
    // deleteBoard( @Param('id') id: string ) : void {
    //     this.boardsService.deleteBoard(id);
    // }
    // ParseIntPipe : 문자열로 전달된 id 값을 숫자로 변환
    @Delete('/:id')
    deleteBoard( @Param('id', ParseIntPipe) id: number ) : Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    // @Patch('/:id/status')
    // updateBoardStatus( 
    //     @Param('id') id: string, 
    //     @Body('status', BoardStatusValidationPipe) status: BoardModel.BoardStatus 
    // ) : BoardModel.Board {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
    @Patch('/:id/status')
    updateBoardStatus( 
        @Param('id', ParseIntPipe) id: number, 
        @Body('status', BoardStatusValidationPipe) status: BoardStatus 
    ) : Promise<Board>  {
        return this.boardsService.updateBoardStatus(id, status);
    }
}