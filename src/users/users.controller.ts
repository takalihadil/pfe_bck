
import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './users.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; fullname: string }) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@Req() req: Request & { user: { id: string } }) {
    const currentUserId = req.user.id; 
    return this.authService.getUsers(currentUserId);
  }
  
  @Get('users/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('userId') userId: string) {
    return this.authService.getUserById(userId)
  }
}
