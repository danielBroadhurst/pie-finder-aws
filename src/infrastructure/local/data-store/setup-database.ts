import { createTable, generateTableParams } from './create-database';
import { deleteTable } from './delete-database';

const TABLE_NAME = process.env.TABLE_NAME || 'PieFinderDB';

export const setupDatabase = async () => {
  const tableParams = generateTableParams({
    tableName: TABLE_NAME,
  });
  try {
    await createTable(tableParams);
    console.log(`Table ${TABLE_NAME} created.`);
  } catch (err) {
    if (err instanceof Error && err.name === 'ResourceInUseException') {
      console.log(`Error: Table ${TABLE_NAME} already in use`);
      await deleteTable(TABLE_NAME);
      await setupDatabase();
    } else {
      console.error(err);
    }
  }
};

if (process.env.APP_ENV === 'development' && process.env.POPULATE_DB) {
  setupDatabase().catch((error) => console.error(error));
}