import { DatabaseSeeder } from "./seeder";

async function main() {
  const seeder = new DatabaseSeeder();

  try {
    await seeder.seed();
  } catch (err) {
    console.error(
      "Unexpected critical error during popualtion of database: ",
      err,
    );
  } finally {
    process.exit(0);
  }
}

main();
