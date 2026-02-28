import { DatabaseSeeder } from "./seeder";

async function main() {
  const grower = new DatabaseSeeder();
  await grower.grow();
}

main().catch((error) => {
  console.error('Unexpected critical error during database growing:', error);
  process.exit(1);
});
