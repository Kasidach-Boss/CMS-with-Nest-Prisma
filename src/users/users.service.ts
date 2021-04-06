import {
    User,
    Prisma
  } from '@prisma/client';
  
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Post as PostModel } from '@prisma/client';
import { runInThisContext } from 'node:vm';

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService){}

    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput):Promise<User>{
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            include: {
                posts: true, 
            },
        });
    }

    async users(params:{
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByInput;
    }): Promise<User[]>{
        const { skip, take, cursor, where, orderBy} = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                posts: true, 
              },
           
        });
    }

    async createUser(data: Prisma.UserCreateInput):Promise<User>{
        return this.prisma.user.create({
            data,
        })
    }

    async updateUser(params:{
        where?: Prisma.UserWhereUniqueInput;
        data?: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data }  = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput):Promise<User>{
        return this.prisma.user.delete({
            where,
        })
    }

    async findByEmail(where: Prisma.UserWhereUniqueInput){
        const getUser: object | null = await this.prisma.user.findUnique({
            where,
            select: {
              email: true,
              
            },
          })
        
    }
    // async findOne(username: string): Promise<User | undefined> {
    //     return this.users.find(user => user.username === username);
    //   }
}
