import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @MaxLength(30)
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  name?: string;
}
