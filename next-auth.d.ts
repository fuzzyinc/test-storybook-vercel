/* eslint-disable no-unused-vars */
import { DefaultJWT } from 'next-auth/jwt';
import { User as FuzzyUser } from './common/api/types';
/**
 * This file provides an extension to NextAuth's default typing/interfaces
 * for its various data shapes.
 *
 * We're using it here to re-type the `user` objects returned by NextAuth
 * to include the fields returned from Fuzzy's authentication system.
 *
 * Docs: https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module 'next-auth' {
  interface Session {
    user: FuzzyUser;
  }

  interface User extends FuzzyUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: FuzzyUser;
  }
}
