import * as bcrypt from 'bcrypt';

export class Hash {
  static make(plainText: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainText, salt);
  }
}
