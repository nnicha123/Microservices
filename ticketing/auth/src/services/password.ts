import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// promisify the scrypt so we can use async await with it
const scryptAsync = promisify(scrypt);

export class Password {
  // note static methods are methods that we can access without creating an instance of a class (e.g. don't need const pass = new Password())...
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 63)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 63)) as Buffer;
    return buf.toString('hex') === hashedPassword;
  }
}
