import { IsNotEmpty } from 'class-validator';

export class CreateRecordDto {
    @IsNotEmpty()
    serviceName: string;

    @IsNotEmpty()
    login: string;
}