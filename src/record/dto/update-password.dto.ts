import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
    @ApiProperty( {example: "password123", description: 'Password'} )
    @IsString()
    password?: string | null;
}