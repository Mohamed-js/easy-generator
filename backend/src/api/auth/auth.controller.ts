import { Controller, Post, Body, Get, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwtAuth/jwt.guard';
import { Types } from 'mongoose';
import { AuthRequest } from 'src/types/express';
import { SecretAuthGuard } from 'src/guards/secretAuth/secret.guard';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    @UseGuards(SecretAuthGuard)
    @ApiHeader({
        name: 'SecretKey',
        description: 'Secret API Key for Authentication',
        required: true,
        schema: { example: 'SOME_SORT_OF_SECRET_KEYYYYY' },
    })
    @ApiOperation({ summary: 'User Sign-Up' })
    @ApiBody({ type: SignUpDto, description: 'User Sign-Up Payload' })
    @ApiResponse({ status: 201, description: 'User successfully signed up', schema: { example: { token: 'jwt_token_here' } } })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Post('signin')
    @UseGuards(SecretAuthGuard)
    @ApiHeader({
        name: 'SecretKey',
        description: 'Secret API Key for Authentication',
        required: true,
        schema: { example: 'SOME_SORT_OF_SECRET_KEYYYYY' },
    })
    @ApiOperation({ summary: 'User Sign-In' })
    @ApiBody({ type: SignInDto, description: 'User Sign-In Payload' })
    @ApiResponse({ status: 201, description: 'User successfully signed in', schema: { example: { token: 'jwt_token_here' } } })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
        return this.authService.signIn(signInDto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiHeader({
        name: 'SecretKey',
        description: 'Secret API Key for Authentication',
        required: true,
        schema: { example: 'SOME_SORT_OF_SECRET_KEYYYYY' },
    })
    @ApiOperation({ summary: 'Get Current Authenticated User' })
    @ApiResponse({
        status: 200,
        description: 'Current authenticated user info',
        schema: {
            example: {
                _id: '65f47f7d8cfa5b3a8e3b8e22',
                email: 'user@example.com',
                name: 'Mo Salah'
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
    async getMe(@Req() req: AuthRequest): Promise<{ _id: Types.ObjectId; email: string; name: string }> {
        const userId = req.userId as unknown as Types.ObjectId;
        const { user } = await this.authService.getMe(userId);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const { _id, email, name } = user;
        return { _id, email, name };
    }
}
