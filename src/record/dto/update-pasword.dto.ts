import { IsBoolean } from 'class-validator';

export class UpdatePasswordDto {
    @IsBoolean()
    password: boolean;
}