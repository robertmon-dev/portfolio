import { Role } from '@prisma/client';
export { Role };

export enum Flag {
  Read = 'read',
  Write = 'write',
  Admin = 'admin'
}

export interface Endpoint {
  name: string;
  flags: Flag[];
}

