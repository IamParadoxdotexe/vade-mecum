import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
const layer = require('/opt/nodejs/layer');

const docClient = DynamoDBDocumentClient.from(new DynamoDBClient());

const handler: APIGatewayProxyHandler = async event =>
  layer.handlerResolver(event, async (event: APIGatewayProxyEvent) => {
    const userId = event.requestContext.identity.user;
    if (!userId) {
      return { statusCode: 403, body: JSON.stringify({ detail: 'Unauthorized.' }) };
    }

    const sessionId = event.queryStringParameters?.sessionId;
    if (!sessionId) {
      return { statusCode: 400, body: JSON.stringify({ detail: 'Invalid query params.' }) };
    }

    const connectionId = event.requestContext.connectionId; // identifies the WebSocket connection

    const putConnection = new PutCommand({
      TableName: 'vade-mecum-sessions',
      Item: {
        sessionId: sessionId,
        itemId: `connection#${connectionId}`,
        userId: userId
      }
    });
    await docClient.send(putConnection);

    return {
      statusCode: 200,
      body: JSON.stringify({})
    };
  });

exports.handler = handler;
