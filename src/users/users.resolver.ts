import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.user({ id });
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.usersService.user({ id: user.id });
  }

  // @Query(() => [User])
  // users(@Args() usersArgs: PaginationArgs): Promise<User[]> {
  //   return this.usersService.users(usersArgs);
  // }

  // @Mutation(() => User)
  // async createUser(
  //   @Args('createUserData') createUserData: CreateUserInput,
  // ): Promise<User> {
  //   const user = await this.usersService.createUser(createUserData);
  //   return user;
  // }

  // @Mutation(() => User)
  // async updateUser(
  //   @Args('id') id: string,
  //   @Args('updateUserData') updateUserData: UpdateUserInput,
  // ): Promise<User> {
  //   const user = await this.usersService.updateUser({
  //     where: { id },
  //     data: updateUserData,
  //   });
  //   return user;
  // }

  // @Mutation(() => Boolean)
  // async deleteUser(@Args('id') id: string) {
  //   return this.usersService.deleteUser({ id });
  // }
}
