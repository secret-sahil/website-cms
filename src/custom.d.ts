/* eslint-disable no-unused-vars */
import { User } from '@prisma/client';
declare global {
  namespace Express {
    interface Request {
      user?: User; // or specify a more specific type for `user`
      hasAccess?: boolean;
    }
  }
}
