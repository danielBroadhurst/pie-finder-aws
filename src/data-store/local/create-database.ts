import {
  CreateTableCommand,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';

import { getClient } from '../core/dynamodb-client';

interface TableParams {
  tableName: string;
  pk?: DynamoKey;
  sk?: DynamoKey;
}

type DynamoKey = {
  name: string;
  type: string;
}

export const generateTableParams = ({
  tableName,
  pk = { name: 'PK', type: 'S' },
  sk = { name: 'SK', type: 'S' },
}: TableParams): CreateTableCommandInput => {
  return {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: pk.name,
        AttributeType: pk.type,
      },
      {
        AttributeName: sk.name,
        AttributeType: sk.type,
      },
    ],
    KeySchema: [
      {
        AttributeName: pk.name,
        KeyType: 'HASH',
      },
      {
        AttributeName: sk.name,
        KeyType: 'RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  };
};

export const createTable = async (input: CreateTableCommandInput) => {
  const client = getClient();
  try {
    await client.send(new CreateTableCommand(input));
  } catch (error) {
    if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
      console.error(
        'Please run `npm run dynamodb:run` or `npm run dynamodb:install` so that local DynamoDB is running.',
      );
    }
    throw error;
  }
};