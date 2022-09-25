import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field()
  _id: string;

  @Field()
  username: string;

  @Field()
  bio?: string;

  @Field()
  image?: string;

  @Field()
  following: boolean;
}
