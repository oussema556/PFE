import { AuthDto } from './dto/auth.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController { 
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    async login(@Body() authDto : AuthDto){
      return await this.authService.login(authDto);
    } 
}
