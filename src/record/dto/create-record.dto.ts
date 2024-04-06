import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecordDto {
    
    @ApiProperty( {example: "gmail.com", description: 'Service name'} )
    @IsNotEmpty()
    @IsString()
    serviceName: string;

    @ApiProperty( {example: "MyLogin", description: 'Login'} )
    @IsNotEmpty()
    @IsString()
    login: string;
}