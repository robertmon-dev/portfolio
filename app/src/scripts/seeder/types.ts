export interface Growing {
  grow(): Promise<void>;
}

export interface Seeding {
  seed(): Promise<void>;
}
