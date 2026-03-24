import * as bcrypt from 'bcrypt';

export class CryptoAdapter {
  static hashSync(text: string) {
    return bcrypt.hashSync(text, 10);
  }

  static compareSync(text: string, encrypted: string) {
    return bcrypt.compareSync(text, encrypted);
  }
}
