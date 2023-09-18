import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './Users.Service';
import { UserDao } from 'src/database/dao/User.Dao';
import { JwtAuthGuard } from '../../utils/Jwt.Auth.Guards';
@Controller('users')
export class UsersController {
   constructor( private readonly usersService: UsersService,) {}

   @Post('register')
   public async Register(@Body() user:any,@Res() res:any){
      const newUser  = await this.usersService.createUserSvc(user); 
      return res.json({newUser})
   }
   @Put('update/:user_id')
   //CHECKING THE TOKEN IF IT IS VALID
   @UseGuards(JwtAuthGuard)
   async updateUser(@Param('user_id') user_id: string, @Body() updates: any) {
       return this.usersService.updateUserSvc(user_id, updates);
   }
   @Delete("deleteuser/:id")
   @UseGuards(JwtAuthGuard)
  public async deleteUser(@Param('id') id: any, @Req() req, @Res() res: any) { 
    const user = req.user;

    if (user.userRole === "Admin") {
        const deleteduser = await this.usersService.deleteUserSvc(id);
        res.json({ deleteduser });
    } else {
        res.status(HttpStatus.FORBIDDEN).json({ message: 'You are Not A Admin' });
    }
}
   @Get('getusers')
  //  @UseGuards(JwtAuthGuard) 
   public async getUsers(
     @Query('page') page: number = 1, 
     @Query('limit') limit: number = 10, 
     @Query('name') name: string, 
     @Res() res: any
   ) { 
     const users = await this.usersService.getUsersSvc(page, limit, name);
     return res.send({
         message: "success",
         users,
     });
   }
}