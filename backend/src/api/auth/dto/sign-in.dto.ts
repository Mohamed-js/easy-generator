import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'User email address',
        required: true,
    })
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({
        example: 'SaFe@123',
        description: 'User password',
        required: true,
    })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
