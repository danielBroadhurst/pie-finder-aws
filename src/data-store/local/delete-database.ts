import { DeleteTableCommand } from '@aws-sdk/client-dynamodb';

import { getClient } from '../core/dynamodb-client';

export const deleteTable = async (tableName: string) => {
  const client = getClient();
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