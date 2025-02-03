import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USERS_SERVICES } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from '../common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Auth } from '../auth/decorators/auth.decorators';
import { Role } from '../auth/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICES) private readonly usersClient: ClientProxy,
  ) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersClient.send('createUser', createUserDto);
  }

  @Auth(Role.ADMIN)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersClient.send('findAllUsers', paginationDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(
    @Param('id') usersId: string,
    @Query('email') email?: { email: string },
  ) {
    if (email) {
      return this.usersClient.send('findOneUser', { email }).pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
    }
    return this.usersClient.send('findOneUser', usersId).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':usersId')
  update(
    @Param('usersId', ParseIntPipe) usersId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersClient
      .send('updateUser', {
        id: usersId,
        ...updateUserDto,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') usersId: string) {
    return this.usersClient.send('removeUser', +usersId).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
