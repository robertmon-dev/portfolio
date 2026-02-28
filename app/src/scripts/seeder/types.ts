export interface Growing {
  run(): Promise<void>;
}

export interface Seeding {
  grow(): Promise<void>;
}
