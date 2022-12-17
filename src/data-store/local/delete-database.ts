import { DeleteTableCommand } from '@aws-sdk/client-dynamodb';

import { getDatabaseClient } from '../../libs/application/db/dynamo-db/dynamodb-client';

export const deleteTable = async (tableName: string) => {
  const client = getDatabaseClient();
  try {
    await client.send(
      new DeleteTableCommand({
        TableName: tableName,
      }),
    );
    console.log(`Table ${tableName} deleted.`);
  } catch (err) {
    if (err instanceof Error && err.name === 'ResourceNotFoundException') {
      console.log(`Error: Table ${tableName} not found`);
    } else {
      throw err;
    }
  }
};