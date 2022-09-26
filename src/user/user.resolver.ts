import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { PaginationArgs } from './dto/pagination.args';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.user({ id });
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => [User])
  users(@Args() usersArgs: PaginationArgs): Promise<User[]> {
    return this.usersService.users(usersArgs);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    const user = await this.usersService.createUser(createUserData);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    const user = await this.usersService.updateUser({
      where: { id },
      data: updateUserData,
    });
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string) {
    return this.usersService.deleteUser({ id });
  }
}
