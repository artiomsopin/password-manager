import { IsBoolean, IsString, ValidateIf } from 'class-validator';

export class UpdateRecordDto {
    @IsString()
    serviceName?: string;
    
    @IsString()
    login?: string;
    
    @IsBoolean()
    password?: boolean;
}