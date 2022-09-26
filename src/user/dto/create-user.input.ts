import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(30)
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  name?: string;
}
