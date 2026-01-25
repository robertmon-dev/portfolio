export enum Role {
  User = 'User',
  Admin = 'Admin',
  Moderator = 'Moderator',
  Viewer = 'Viewer'
}

export enum Flag {
  Read = 'read',
  Write = 'write',
  Admin = 'admin'
}

export interface Endpoint {
  name: string;
  flags: Flag[];
}

