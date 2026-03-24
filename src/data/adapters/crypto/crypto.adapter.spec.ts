import { CryptoAdapter } from './crypto.adapter';

describe('CryptoAdapter', () => {
  const plainText = 'my-secret-password';

  describe('hashSync', () => {
    it('should return a hashed string', () => {
      const hash = CryptoAdapter.hashSync(plainText);

      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash).not.toBe(plainText);
    });

    it('should generate different hashes for the same input', () => {
      const hash1 = CryptoAdapter.hashSync(plainText);
      const hash2 = CryptoAdapter.hashSync(plainText);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('compareSync', () => {
    it('should return true when text matches hash', () => {
      const hash = CryptoAdapter.hashSync(plainText);

      const result = CryptoAdapter.compareSync(plainText, hash);

      expect(result).toBe(true);
    });

    it('should return false when text does not match hash', () => {
      const hash = CryptoAdapter.hashSync(plainText);

      const result = CryptoAdapter.compareSync('wrong-password', hash);

      expect(result).toBe(false);
    });

    it('should return false when hash is invalid', () => {
      const result = CryptoAdapter.compareSync(plainText, 'invalid-hash');

      expect(result).toBe(false);
    });
  });
});
