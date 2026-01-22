// 유효성 체크를 위한 class-validator 임포트
import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}

