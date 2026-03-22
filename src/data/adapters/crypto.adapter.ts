import * as bcrypt from 'bcrypt';

export class CryptoAdapter {
  static encrypt(text: string) {
    return bcrypt.hashSync(text, 10);
  }

  static compareEncrypted(text: string, encrypted: string) {
    return bcrypt.compareSync(text, encrypted);
  }
}
