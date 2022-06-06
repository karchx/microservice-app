import { ObjectId } from 'mongoose';

/**
 * User response object
 */

export class UserDto {
  readonly _id?: ObjectId;
  readonly email: string;
  readonly password: string;
  readonly bio?: string;
  readonly image?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
