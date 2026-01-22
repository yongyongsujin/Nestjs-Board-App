import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform{

    readonly statusOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ];

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status option`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.statusOptions.indexOf(status);
        return idx !== -1;
    }
}