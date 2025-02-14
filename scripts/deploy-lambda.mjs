import { execSync } from 'child_process';
import { renameSync } from 'fs';

const args = process.argv.slice(2);

const fnName = args[0];

if (!fnName) {
  console.log(`Usage:
  npm run deploy:lambda <functionName>`);
  process.exit(1);
}

console.log('Transpiling lambda function...');
execSync(
  `npx tsc ./aws/lambda/${fnName}.ts --outDir ./lambda_build --module nodenext --moduleResolution node`
);

console.log('Zipping lambda function...');
renameSync(`./lambda_build/${fnName}.js`, './lambda_build/index.js');
execSync('cd lambda_build && npx bestzip index.zip index.js && cd ..');

console.log('Deploying lambda function...');
try {
  execSync(
    `aws lambda update-function-code --function-name vade-mecum__${fnName} --zip-file fileb://lambda_build/index.zip`
  );
} catch (err) {
  if (err.stderr.toString().includes('Function not found')) {
    console.log('Creating new lambda function...');
    execSync(
      `aws lambda create-function --function-name vade-mecum__${fnName} --runtime nodejs20.x --role arn:aws:iam::662280876471:role/vade-mecum-dynamo-db-role --handler index.handler --zip-file fileb://lambda_build/index.zip`
    );
  }
}

console.log(`Lambda function vade-mecum__${fnName} deployed.`);
