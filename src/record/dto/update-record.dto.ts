import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, ValidateIf } from 'class-validator';

export class UpdateRecordDto {

    @ApiProperty( {example: "gmail.com", description: 'Service name'} )
    @IsString()
    serviceName?: string | null;
    
    @ApiProperty( {example: "MyLogin", description: 'Login'} )
    @IsString()
    login?: string | null;
    
    @ApiProperty( {example: "true", description: 'True if password should be updated or false if not'} )
    @IsBoolean()
    password?: boolean | null;
}