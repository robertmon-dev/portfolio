import { DatabaseSeeder } from "./seeder";

async function main() {
  const seeder = new DatabaseSeeder();
  await seeder.seed();
}

main().catch((error) => {
  console.error('Unexpected critical error during popualtion of database: ', error);
  process.exit(1);
});
