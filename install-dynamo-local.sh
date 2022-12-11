#!/bin/sh

curl -O https://s3.eu-central-1.amazonaws.com/dynamodb-local-frankfurt/dynamodb_local_latest.tar.gz
mkdir dynamodb
tar -xf dynamodb_local_latest.tar.gz -C ./dynamodb
java -Djava.library.path=./DynamoDBLocal_lib -jar ./dynamodb/DynamoDBLocal.jar -sharedDb