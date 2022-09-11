import { ObjectId } from 'mongodb';

/*
 * Profile reponse object
 */
export class ProfileDto {
  readonly _id: ObjectId;
  readonly username: string;
  readonly bio: string;
  readonly image: string;
  readonly following: boolean;
}
