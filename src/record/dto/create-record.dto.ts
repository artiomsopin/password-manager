import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecordDto {
    
    @IsNotEmpty()
    @IsString()
    serviceName: string;

    @IsNotEmpty()
    @IsString()
    login: string;
}