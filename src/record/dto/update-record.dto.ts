import { IsBoolean, IsString, ValidateIf } from 'class-validator';

export class UpdateRecordDto {
    @IsString()
    serviceName?: string | null;
    
    @IsString()
    login?: string | null;
    
    @IsBoolean()
    password?: boolean | null;
}