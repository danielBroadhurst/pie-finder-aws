# Pie Finder Serverless

## Packages Used

- [projen](https://github.com/projen/projen) Used to generate a CDK TypeScript Starter Project
- [cdk-organizations](https://github.com/pepperize/cdk-organizations) Used to deploy additional Accounts

## Projen Commands

To generate a new TypeScript CDK Application 

`npx projen new awscdk-app-ts`

## Stack Commands

AWS CDK Bootstrap Trust Account
`cdk bootstrap aws://581383034143/eu-west-2 --trust 581782790003 --cloudformation-execution-policies "arn:aws:iam::aws:policy/AdministratorAccess"`