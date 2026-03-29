import { DatabaseSeeder } from "./seeder";

async function main() {
  const seeder = new DatabaseSeeder();

  try {
    await seeder.seed();
  } finally {
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(
    "Unexpected critical error during popualtion of database: ",
    error,
  );
  process.exit(1);
});
