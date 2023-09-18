import { Controller, Get, Res, Body, Post,UseGuards, Req, Param} from '@nestjs/common';
import { AuthService } from './Auth.Service';
import { JwtAuthGuard } from '../../utils/Jwt.Auth.Guards';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger/dist';

// @ApiTags('auth')
@Controller('auth')

export class AuthController {
    constructor(private readonly AuthService: AuthService) {}

    @Get('LogedUser')
    @ApiCreatedResponse()
    @UseGuards(JwtAuthGuard) 
       public async getloguser(@Res() res: any) {  
        const getLoguser = await this.AuthService.getUsers()
        res.send(getLoguser);
    }

    @Post('login')
    @ApiCreatedResponse()
    public async login(@Body() user: any, @Res() res: any) {
        const loginuser = await this.AuthService.loginUser(user)
        res.send(loginuser)
    }

    @Post('logout/:id')
    @UseGuards(JwtAuthGuard)
    public async logout(@Param('id') id: string, @Res() res: any) {
    
        await this.AuthService.logoutUserSvc(id);
        res.send('User Logged out successfully');
    }

}
